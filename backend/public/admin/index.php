<?php
declare(strict_types=1);
require dirname(__DIR__, 2) . '/lib.php';

session_set_cookie_params(['httponly' => true, 'samesite' => 'Lax', 'secure' => !empty($_SERVER['HTTPS'])]);
session_start();

$self = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/') . '/';

/* ---------- helpers ---------- */
function csrf(): string {
    if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(16));
    return $_SESSION['csrf'];
}
function check_csrf(): void {
    if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) {
        http_response_code(400);
        exit('Session expired, or the photo was too big. Go back, refresh and try again.');
    }
}
function n($v): int { return max(0, (int)$v); }
function p(string $k, $r, string $d = ''): string {
    $v = $_POST[$k][$r] ?? $d;
    return is_string($v) ? trim($v) : $d;
}
function rows(string $k): array {
    return is_array($_POST[$k] ?? null) ? array_keys($_POST[$k]) : [];
}
function safe_url(string $u): string {
    $u = trim($u);
    return preg_match('~^(https?://|mailto:|tel:|/)~i', $u) ? $u : '';
}
function slugify(string $s): string {
    $s = strtolower(trim((string)preg_replace('/[^A-Za-z0-9]+/', '-', $s), '-'));
    return $s !== '' ? $s : 'story-' . time();
}
function recent_fails(): array {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'x';
    $all = read_json('attempts.json', []);
    return array_values(array_filter($all[$ip] ?? [], fn($t) => $t > time() - 900));
}
function record_fail(): void {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'x';
    $all = read_json('attempts.json', []);
    $all[$ip] = recent_fails();
    $all[$ip][] = time();
    write_json('attempts.json', $all, false);
}
function save_upload(string $field, $r, string $keep = ''): string {
    $f = $_FILES[$field] ?? null;
    if (!$f || !isset($f['error'][$r]) || $f['error'][$r] === UPLOAD_ERR_NO_FILE) return $keep;
    if ($f['error'][$r] !== UPLOAD_ERR_OK || $f['size'][$r] > 2 * 1024 * 1024) {
        throw new RuntimeException('Each image must be under 2 MB. Please shrink it and try again.');
    }
    $info = @getimagesize($f['tmp_name'][$r]);
    $ext = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'][$info['mime'] ?? ''] ?? null;
    if (!$ext) throw new RuntimeException('Only JPG, PNG or WEBP images are allowed.');
    $dir = dirname(__DIR__) . '/uploads';
    if (!is_dir($dir)) mkdir($dir, 0775, true);
    $name = bin2hex(random_bytes(8)) . '.' . $ext;
    if (!move_uploaded_file($f['tmp_name'][$r], $dir . '/' . $name)) throw new RuntimeException('Could not save the image.');
    return '/uploads/' . $name;
}
function open_form(string $action, string $t, bool $multi = false): void {
    echo '<form method="post"' . ($multi ? ' enctype="multipart/form-data"' : '') . ' autocomplete="off">';
    echo '<input type="hidden" name="csrf" value="' . h($t) . '"><input type="hidden" name="action" value="' . h($action) . '">';
}
function thumb(string $path): string {
    if ($path === '') return '';
    return (str_starts_with($path, '/uploads/') ? '<img class="thumb" src="' . h($path) . '" alt="">' : '') . '<small>Current: ' . h($path) . '</small>';
}

function country_ref(): array {
    // name => [map code, longitude, latitude]
    return [
        'Algeria' => [12, 3, 28], 'Botswana' => [72, 24, -22], 'Burundi' => [108, 29.9, -3.4], 'Cameroon' => [120, 12.4, 5.7],
        'DR Congo' => [180, 23.6, -2.9], 'Djibouti' => [262, 42.6, 11.8], 'Egypt' => [818, 30, 26.5], 'Eritrea' => [232, 39, 15.4],
        'Ethiopia' => [231, 39, 9], 'Ghana' => [288, -1.2, 7.9], 'Kenya' => [404, 37.9, 0.5], 'Malawi' => [454, 34.3, -13.2],
        'Morocco' => [504, -6.8, 31.8], 'Mozambique' => [508, 35.5, -17.3], 'Namibia' => [516, 17.1, -22], 'Nigeria' => [566, 8, 9.6],
        'Rwanda' => [646, 29.9, -1.9], 'Senegal' => [686, -14.5, 14.5], 'Somalia' => [706, 46, 5.5], 'South Africa' => [710, 25, -29],
        'South Sudan' => [728, 30, 7.5], 'Sudan' => [729, 30, 15.5], 'Tanzania' => [834, 34.8, -6.4], 'Tunisia' => [788, 9.5, 34],
        'Uganda' => [800, 32.3, 1.4], 'Zambia' => [894, 27.8, -13.1], 'Zimbabwe' => [716, 29.8, -19],
        'Azerbaijan' => [31, 47.6, 40.3], 'Bangladesh' => [50, 90.3, 23.7], 'China' => [156, 104, 35], 'Cyprus' => [196, 33.2, 35],
        'India' => [356, 79, 22], 'Indonesia' => [360, 113, -2], 'Iran' => [364, 53, 32.5], 'Iraq' => [368, 44, 33],
        'Japan' => [392, 138, 36], 'Jordan' => [400, 36.5, 31], 'Kazakhstan' => [398, 67, 48], 'Kuwait' => [414, 47.6, 29.3],
        'Lebanon' => [422, 35.9, 33.9], 'Malaysia' => [458, 102, 4], 'Oman' => [512, 56, 21], 'Pakistan' => [586, 69.3, 30],
        'Philippines' => [608, 122, 12.5], 'Qatar' => [634, 51.2, 25.3], 'Saudi Arabia' => [682, 45, 24], 'Singapore' => [702, 103.8, 1.35],
        'South Korea' => [410, 128, 36.5], 'Sri Lanka' => [144, 80.7, 7.9], 'Thailand' => [764, 101, 15], 'Turkey' => [792, 35, 39],
        'UAE' => [784, 54, 24], 'Uzbekistan' => [860, 64.5, 41.4], 'Vietnam' => [704, 106, 16],
        'Austria' => [40, 14.5, 47.6], 'Belgium' => [56, 4.6, 50.6], 'Bulgaria' => [100, 25.2, 42.7], 'Czechia' => [203, 15.5, 49.8],
        'Denmark' => [208, 9.5, 56], 'Estonia' => [233, 25.5, 58.7], 'Finland' => [246, 26, 64], 'France' => [250, 2.5, 46.6],
        'Germany' => [276, 10.4, 51], 'Greece' => [300, 22, 39], 'Hungary' => [348, 19.5, 47.2], 'Ireland' => [372, -8, 53.2],
        'Italy' => [380, 12.5, 42.8], 'Netherlands' => [528, 5.3, 52.2], 'Norway' => [578, 9, 61], 'Poland' => [616, 19.4, 52],
        'Portugal' => [620, -8, 39.7], 'Romania' => [642, 25, 45.9], 'Russia' => [643, 95, 62], 'Spain' => [724, -3.7, 40],
        'Sweden' => [752, 16, 62], 'Switzerland' => [756, 8.2, 46.8], 'Ukraine' => [804, 31, 49], 'United Kingdom' => [826, -2, 54],
        'Argentina' => [32, -64, -34], 'Australia' => [36, 134, -25], 'Brazil' => [76, -52, -10], 'Canada' => [124, -100, 58],
        'Chile' => [152, -71, -33], 'Colombia' => [170, -74, 4.6], 'Costa Rica' => [188, -84, 10], 'Cuba' => [192, -79, 21.6],
        'Mexico' => [484, -102, 23.6], 'New Zealand' => [554, 172, -41], 'USA' => [840, -98, 39],
    ];
}
/* ---------- state ---------- */
$tabs = ['numbers' => 'Numbers', 'news' => 'News', 'stories' => 'Stories', 'partners' => 'Partners','reach' => 'World reach', 'careers' => 'Careers', 'links' => 'Social links', 'account' => 'Admins'];
$tab = $_GET['tab'] ?? 'numbers';
if (!isset($tabs[$tab])) $tab = 'numbers';

$msg = '';
$err = '';
if (!empty($_SESSION['flash'])) { [$msg, $err] = $_SESSION['flash']; unset($_SESSION['flash']); }

$users = read_json('users.json', []);
$content = read_json('content.json', []);
$action = $_POST['action'] ?? '';

/* ---------- actions ---------- */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_csrf();

    if ($action === 'setup' && !$users) {
        $u = trim($_POST['username'] ?? '');
        $pw = $_POST['password'] ?? '';
        if ($u === '' || strlen($pw) < 10) $err = 'Choose a username and a password of at least 10 characters.';
        elseif ($pw !== ($_POST['confirm'] ?? '')) $err = 'The passwords do not match.';
        else {
            $users = [['username' => $u, 'hash' => password_hash($pw, PASSWORD_DEFAULT)]];
            write_json('users.json', $users, false);
            $msg = 'Admin account created. Please sign in.';
        }

    } elseif ($action === 'login') {
        if (count(recent_fails()) >= 5) {
            $err = 'Too many attempts. Please try again in 15 minutes.';
        } else {
            $ok = false;
            foreach ($users as $x) {
                if (hash_equals($x['username'], trim($_POST['username'] ?? '')) && password_verify($_POST['password'] ?? '', $x['hash'])) $ok = $x['username'];
            }
            if ($ok) { session_regenerate_id(true); $_SESSION['user'] = $ok; header('Location: ' . $self); exit; }
            record_fail();
            $err = 'Wrong username or password.';
        }

    } elseif ($action === 'logout') {
        session_destroy();
        header('Location: ' . $self);
        exit;

    } elseif (isset($_SESSION['user'])) {
        try {
            switch ($action) {

                case 'numbers':
                    $content['headline'] = [
                        'beneficiaries' => n($_POST['hb'] ?? 0),
                        'graduates' => n($_POST['hg'] ?? 0),
                        'portfolioMillions' => (int)round(max(0, (float)($_POST['hp'] ?? 0)) * 1000),
                        'repayment' => min(100, n($_POST['hr'] ?? 0)),
                    ];
                    $content['asOf'] = trim($_POST['asOf'] ?? '');
                    foreach ($content['programs'] ?? [] as $i => $pr) {
                        $content['programs'][$i]['beneficiaries'] = n($_POST['pb'][$i] ?? 0);
                        $g = p('pg', $i);
                        $content['programs'][$i]['graduates'] = $g === '' ? null : n($g);
                    }
                    $levels = [];
                    foreach (rows('ln') as $r) {
                        $name = p('ln', $r);
                        if ($name !== '') $levels[] = [$name, n($_POST['lv'][$r] ?? 0)];
                    }
                    $content['levels'] = $levels;
                    write_json('content.json', $content);
                    $msg = 'Saved. The website now shows the new numbers.';
                    break;

                case 'news':
                    $old = $content['news'] ?? [];
                    $new = [];
                    $slugs = [];
                    foreach (rows('title') as $r) {
                        $title = p('title', $r);
                        if ($title === '' || !empty($_POST['del'][$r])) continue;
                        $o = p('orig', $r);
                        $item = ($o !== '' && isset($old[(int)$o])) ? $old[(int)$o] : [];
                        $slug = $item['slug'] ?? slugify($title);
                        while (in_array($slug, $slugs, true)) $slug .= '-' . random_int(10, 99);
                        $slugs[] = $slug;
                        $date = p('date', $r);
                        $body = array_values(array_filter(array_map('trim', preg_split('/\R{2,}/', p('body', $r)) ?: [])));
                        $item = array_merge($item, [
                            'slug' => $slug,
                            'title' => $title,
                            'date' => preg_match('/^\d{4}-\d{2}-\d{2}$/', $date) ? $date : date('Y-m-d'),
                            'tag' => p('tag', $r) ?: 'News',
                            'summary' => p('summary', $r),
                            'body' => $body,
                            'focus' => p('focus', $r) ?: 'center',
                        ]);
                        $item['image'] = save_upload('image', $r, $item['image'] ?? '') ?: '/images/hero.jpg';
                        $item['gallery'] = $item['gallery'] ?? [];
                        $sn = p('sname', $r);
                        $su = safe_url(p('surl', $r));
                        if ($sn !== '' && $su !== '') $item['source'] = ['name' => $sn, 'url' => $su]; else unset($item['source']);
                        $new[] = $item;
                    }
                    $content['news'] = $new;
                    write_json('content.json', $content);
                    $msg = 'News saved.';
                    break;

                case 'stories':
                    $old = $content['testimonials'] ?? [];
                    $new = [];
                    foreach (rows('quote') as $r) {
                        if (!empty($_POST['del'][$r])) continue;
                        $quote = p('quote', $r);
                        $who = p('who', $r);
                        if ($quote === '' && $who === '') continue;
                        $o = p('orig', $r);
                        $item = ($o !== '' && isset($old[(int)$o])) ? $old[(int)$o] : [];
                        $item['quote'] = $quote;
                        $item['who'] = $who;
                        $ini = p('initials', $r);
                        if ($ini !== '') $item['initials'] = $ini; else unset($item['initials']);
                        $photo = save_upload('photo', $r, $item['photo'] ?? '');
                        if ($photo !== '') $item['photo'] = $photo; else unset($item['photo']);
                        $new[] = $item;
                    }
                    $content['testimonials'] = $new;
                    write_json('content.json', $content);
                    $msg = 'Stories saved.';
                    break;

                case 'partners':
                    $old = $content['partners'] ?? [];
                    $new = [];
                    foreach (rows('name') as $r) {
                        $name = p('name', $r);
                        if ($name === '' || !empty($_POST['del'][$r])) continue;
                        $o = p('orig', $r);
                        $item = ($o !== '' && isset($old[(int)$o])) ? $old[(int)$o] : [];
                        $item['name'] = $name;
                        $item['logo'] = save_upload('logo', $r, $item['logo'] ?? '');
                        $item['dark'] = !empty($_POST['dark'][$r]);
                        $new[] = $item;
                    }
                    $content['partners'] = $new;
                    write_json('content.json', $content);
                    $msg = 'Partners saved.';
                    break;

                  case 'countries':
                    $old = $content['countries'] ?? [];
                    $ref = country_ref();
                    $new = [];
                    $names = [];
                    $unknown = [];
                    foreach (rows('cname') as $r) {
                        if (!empty($_POST['del'][$r])) continue;
                        $o = p('orig', $r);
                        if ($o !== '' && isset($old[(int)$o])) {
                            $item = $old[(int)$o];
                        } else {
                            $name = p('cname', $r);
                            if ($name === '') continue;
                            if (!isset($ref[$name])) { $unknown[] = $name; continue; }
                            [$code, $lon, $lat] = $ref[$name];
                            $item = ['name' => $name, 'codes' => [$code], 'pin' => [$lon, $lat]];
                        }
                        if (in_array($item['name'], $names, true)) continue;
                        $names[] = $item['name'];
                        $item['universities'] = n($_POST['cu'][$r] ?? 0);
                        $item['beneficiaries'] = n($_POST['cb'][$r] ?? 0);
                        $new[] = $item;
                    }
                    $content['countries'] = $new;
                    write_json('content.json', $content);
                    $msg = 'World reach saved. The map and totals on the website are updated.';
                    if ($unknown) $err = 'Pick countries from the list. Not added: ' . implode(', ', $unknown) . '.';
                    break;

                case 'careers':
                    $new = [];
                    foreach (rows('title') as $r) {
                        $t = p('title', $r);
                        if ($t === '' || !empty($_POST['del'][$r])) continue;
                        $new[] = ['title' => $t, 'location' => p('location', $r), 'link' => safe_url(p('link', $r))];
                    }
                    $content['careers'] = $new;
                    write_json('content.json', $content);
                    $msg = 'Careers saved.';
                    break;

                case 'links':
                    $new = [];
                    foreach (rows('label') as $r) {
                        $label = p('label', $r);
                        $url = safe_url(p('url', $r));
                        if ($label !== '' && $url !== '') $new[] = ['label' => $label, 'url' => $url];
                    }
                    $content['socials'] = $new;
                    write_json('content.json', $content);
                    $msg = 'Social links saved.';
                    break;

                case 'password':
                    foreach ($users as $i => $x) {
                        if ($x['username'] !== $_SESSION['user']) continue;
                        if (!password_verify($_POST['current'] ?? '', $x['hash'])) $err = 'Your current password is wrong.';
                        elseif (strlen($_POST['new'] ?? '') < 10) $err = 'The new password must be at least 10 characters.';
                        else {
                            $users[$i]['hash'] = password_hash($_POST['new'], PASSWORD_DEFAULT);
                            write_json('users.json', $users, false);
                            $msg = 'Password changed.';
                        }
                    }
                    break;

                case 'adduser':
                    $u = trim($_POST['username'] ?? '');
                    $pw = $_POST['password'] ?? '';
                    $exists = array_filter($users, fn($x) => strtolower($x['username']) === strtolower($u));
                    if ($u === '' || strlen($pw) < 10) $err = 'Enter a username and a password of at least 10 characters.';
                    elseif ($exists) $err = 'That username already exists.';
                    else {
                        $users[] = ['username' => $u, 'hash' => password_hash($pw, PASSWORD_DEFAULT)];
                        write_json('users.json', $users, false);
                        $msg = 'New admin added.';
                    }
                    break;
            }
        } catch (RuntimeException $e) {
            $err = $e->getMessage();
        }
        $_SESSION['flash'] = [$msg, $err];
        header('Location: ' . $self . '?tab=' . urlencode($tab));
        exit;
    }
}

$logged = isset($_SESSION['user']);
$t = csrf();
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>AEDT Admin</title>
<style>
*{box-sizing:border-box}
body{margin:0;font-family:system-ui,Segoe UI,Arial,sans-serif;background:#F3F7F5;color:#1B2A3A}
header{background:#0B2545;color:#fff;padding:14px 24px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
header b{font-size:1.1rem}
main{max-width:920px;margin:26px auto;padding:0 20px 60px}
.tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:20px}
.tabs a{padding:9px 16px;border-radius:999px;background:#fff;color:#0B2545;text-decoration:none;font-weight:600;font-size:.9rem;border:1px solid #dbe5ea}
.tabs a.on{background:#1E9E5A;color:#fff;border-color:#1E9E5A}
.card{background:#fff;border-radius:16px;padding:24px;margin-bottom:20px;box-shadow:0 8px 24px rgba(11,37,69,.08)}
.item{border:1px solid #e3e9ee;border-radius:14px;padding:16px;margin-bottom:16px;background:#fbfdfc}
.item h3{margin:0 0 6px;font-size:1rem;color:#0B2545}
h2{margin:0 0 14px;color:#0B2545}
label{display:block;font-weight:600;font-size:.88rem;margin:12px 0 4px}
input,textarea{width:100%;padding:10px 12px;border:1px solid #cdd8e0;border-radius:10px;font-size:1rem;font-family:inherit}
input[type=checkbox]{width:auto}
textarea{resize:vertical}
table{width:100%;border-collapse:collapse}
td,th{padding:6px 8px;text-align:left;font-size:.92rem}
.row{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}
button{background:#1E9E5A;color:#fff;border:0;border-radius:999px;padding:12px 26px;font-size:1rem;font-weight:600;cursor:pointer;margin-top:18px}
button.out{background:transparent;border:1px solid #fff;padding:8px 18px;margin:0}
.ok{background:#E8F5EE;color:#146b45;padding:12px 16px;border-radius:10px;margin-bottom:18px}
.bad{background:#FDECEC;color:#a12626;padding:12px 16px;border-radius:10px;margin-bottom:18px}
.narrow{max-width:420px;margin:60px auto}
.del{display:flex;align-items:center;gap:8px;color:#a12626;font-weight:600;margin-top:12px}
.del input{width:auto}
.thumb{display:block;max-width:140px;max-height:90px;border-radius:8px;margin:6px 0}
small{color:#5A6B7B;display:block}
</style>
</head>
<body>
<header>
  <b>AEDT Website Admin</b>
  <?php if ($logged): ?>
    <form method="post"><input type="hidden" name="csrf" value="<?= h($t) ?>"><input type="hidden" name="action" value="logout"><button class="out">Sign out (<?= h($_SESSION['user']) ?>)</button></form>
  <?php endif; ?>
</header>
<main>
<?php if ($msg): ?><div class="ok"><?= h($msg) ?></div><?php endif; ?>
<?php if ($err): ?><div class="bad"><?= h($err) ?></div><?php endif; ?>

<?php if (!$users): ?>
  <div class="card narrow">
    <h2>Create the first admin</h2>
    <small>Do this straight after uploading, before anyone else can.</small>
    <?php open_form('setup', $t); ?>
      <label>Username</label><input name="username" required>
      <label>Password (10+ characters)</label><input type="password" name="password" required>
      <label>Repeat password</label><input type="password" name="confirm" required>
      <button>Create admin</button>
    </form>
  </div>

<?php elseif (!$logged): ?>
  <div class="card narrow">
    <h2>Sign in</h2>
    <?php open_form('login', $t); ?>
      <label>Username</label><input name="username" required autofocus>
      <label>Password</label><input type="password" name="password" required>
      <button>Sign in</button>
    </form>
  </div>

<?php else: ?>
  <nav class="tabs">
    <?php foreach ($tabs as $k => $label): ?>
      <a href="?tab=<?= h($k) ?>" class="<?= $k === $tab ? 'on' : '' ?>"><?= h($label) ?></a>
    <?php endforeach; ?>
  </nav>

  <?php if ($tab === 'numbers'): $hl = $content['headline'] ?? []; $lv = $content['levels'] ?? []; $lv[] = ['', '']; $lv[] = ['', '']; ?>
    <div class="card">
      <h2>Impact numbers</h2>
      <?php open_form('numbers', $t); ?>
        <div class="row">
          <div><label>Total beneficiaries</label><input type="number" min="0" name="hb" value="<?= h($hl['beneficiaries'] ?? 0) ?>"></div>
          <div><label>Graduates</label><input type="number" min="0" name="hg" value="<?= h($hl['graduates'] ?? 0) ?>"></div>
          <div><label>Loan portfolio (KES billions)</label><input type="number" min="0" step="0.01" name="hp" value="<?= h(round(($hl['portfolioMillions'] ?? 0) / 1000, 2)) ?>"><small>For example 1.5 shows as KES 1.5B</small></div>
          <div><label>Repayment rate (%)</label><input type="number" min="0" max="100" name="hr" value="<?= h($hl['repayment'] ?? 0) ?>"></div>
          <div><label>"As at" date</label><input name="asOf" value="<?= h($content['asOf'] ?? '') ?>"></div>
        </div>

        <h2 style="margin-top:28px">Beneficiaries and graduates by programme</h2>
        <table>
          <tr><th>Programme</th><th>Beneficiaries</th><th>Graduates <small>(blank if none)</small></th></tr>
          <?php foreach ($content['programs'] ?? [] as $i => $pr): ?>
            <tr>
              <td><?= h($pr['title']) ?></td>
              <td><input type="number" min="0" name="pb[<?= $i ?>]" value="<?= h($pr['beneficiaries']) ?>"></td>
              <td><input type="number" min="0" name="pg[<?= $i ?>]" value="<?= h($pr['graduates'] ?? '') ?>"></td>
            </tr>
          <?php endforeach; ?>
        </table>

        <h2 style="margin-top:28px">Beneficiaries by study level (bar chart)</h2>
        <small>To add a bar, fill an empty row. To remove one, clear its name.</small>
        <table>
          <tr><th>Level or programme</th><th>Beneficiaries</th></tr>
          <?php foreach ($lv as $r => $l): ?>
            <tr>
              <td><input name="ln[<?= $r ?>]" value="<?= h($l[0]) ?>"></td>
              <td><input type="number" min="0" name="lv[<?= $r ?>]" value="<?= h($l[1]) ?>"></td>
            </tr>
          <?php endforeach; ?>
        </table>
        <button>Save changes</button>
      </form>
    </div>

  <?php elseif ($tab === 'news'): $list = $content['news'] ?? []; $list[] = []; ?>
    <div class="card">
      <h2>News stories</h2>
      <small>Photos: JPG, PNG or WEBP, under 2 MB. Separate paragraphs with a blank line. Fill the empty card at the bottom to add a story.</small>
      <?php open_form('news', $t, true); ?>
        <?php foreach ($list as $r => $a): $new = !isset($content['news'][$r]); ?>
          <div class="item">
            <h3><?= $new ? 'Add a new story' : h($a['title']) ?></h3>
            <input type="hidden" name="orig[<?= $r ?>]" value="<?= $new ? '' : $r ?>">
            <label>Title</label><input name="title[<?= $r ?>]" value="<?= h($a['title'] ?? '') ?>">
            <div class="row">
              <div><label>Date</label><input type="date" name="date[<?= $r ?>]" value="<?= h($a['date'] ?? date('Y-m-d')) ?>"></div>
              <div><label>Label</label><input name="tag[<?= $r ?>]" value="<?= h($a['tag'] ?? 'News') ?>"></div>
              <div><label>Photo focus <small>keeps faces in view, e.g. 50% 10%</small></label><input name="focus[<?= $r ?>]" value="<?= h($a['focus'] ?? '50% 20%') ?>"></div>
            </div>
            <label>Short summary (shown on the card)</label><textarea rows="2" name="summary[<?= $r ?>]"><?= h($a['summary'] ?? '') ?></textarea>
            <label>Full story</label><textarea rows="8" name="body[<?= $r ?>]"><?= h(implode("\n\n", $a['body'] ?? [])) ?></textarea>
            <label>Photo</label><input type="file" name="image[<?= $r ?>]" accept="image/jpeg,image/png,image/webp"><?= thumb($a['image'] ?? '') ?>
            <div class="row">
              <div><label>Also reported by (name)</label><input name="sname[<?= $r ?>]" value="<?= h($a['source']['name'] ?? '') ?>"></div>
              <div><label>Link to the article</label><input name="surl[<?= $r ?>]" value="<?= h($a['source']['url'] ?? '') ?>"></div>
            </div>
            <?php if (!$new): ?><label class="del"><input type="checkbox" name="del[<?= $r ?>]" value="1"> Delete this story</label><?php endif; ?>
          </div>
        <?php endforeach; ?>
        <button>Save news</button>
      </form>
    </div>

  <?php elseif ($tab === 'stories'): $list = $content['testimonials'] ?? []; $list[] = []; ?>
    <div class="card">
      <h2>Voices of beneficiaries</h2>
      <small>Only add a photo or name with the person's written consent. Without a photo, round initials are shown.</small>
      <?php open_form('stories', $t, true); ?>
        <?php foreach ($list as $r => $s): $new = !isset($content['testimonials'][$r]); ?>
          <div class="item">
            <h3><?= $new ? 'Add a new story' : 'Story ' . ($r + 1) ?></h3>
            <input type="hidden" name="orig[<?= $r ?>]" value="<?= $new ? '' : $r ?>">
            <label>Quote</label><textarea rows="4" name="quote[<?= $r ?>]"><?= h($s['quote'] ?? '') ?></textarea>
            <div class="row">
              <div><label>Shown under the quote (e.g. Teacher, UU-SSP programme)</label><input name="who[<?= $r ?>]" value="<?= h($s['who'] ?? '') ?>"></div>
              <div><label>Initials if no photo</label><input name="initials[<?= $r ?>]" maxlength="3" value="<?= h($s['initials'] ?? '') ?>"></div>
            </div>
            <label>Photo (optional)</label><input type="file" name="photo[<?= $r ?>]" accept="image/jpeg,image/png,image/webp"><?= thumb($s['photo'] ?? '') ?>
            <?php if (!$new): ?><label class="del"><input type="checkbox" name="del[<?= $r ?>]" value="1"> Delete this story</label><?php endif; ?>
          </div>
        <?php endforeach; ?>
        <button>Save stories</button>
      </form>
    </div>

  <?php elseif ($tab === 'partners'): $list = $content['partners'] ?? []; $list[] = []; ?>
    <div class="card">
      <h2>Partners</h2>
      <small>Upload each partner's official logo (PNG with a transparent background is best). Tick "white logo" if the logo is white or very light.</small>
      <?php open_form('partners', $t, true); ?>
        <?php foreach ($list as $r => $pa): $new = !isset($content['partners'][$r]); ?>
          <div class="item">
            <h3><?= $new ? 'Add a new partner' : h($pa['name']) ?></h3>
            <input type="hidden" name="orig[<?= $r ?>]" value="<?= $new ? '' : $r ?>">
            <label>Partner name</label><input name="name[<?= $r ?>]" value="<?= h($pa['name'] ?? '') ?>">
            <label>Logo</label><input type="file" name="logo[<?= $r ?>]" accept="image/jpeg,image/png,image/webp"><?= thumb($pa['logo'] ?? '') ?>
            <label class="del" style="color:#1B2A3A"><input type="checkbox" name="dark[<?= $r ?>]" value="1" <?= !empty($pa['dark']) ? 'checked' : '' ?>> This logo is white or very light</label>
            <?php if (!$new): ?><label class="del"><input type="checkbox" name="del[<?= $r ?>]" value="1"> Delete this partner</label><?php endif; ?>
          </div>
        <?php endforeach; ?>
        <button>Save partners</button>
      </form>
    </div>

      <?php elseif ($tab === 'reach'):
      $list = $content['countries'] ?? [];
      $have = array_column($list, 'name');
      $options = array_values(array_diff(array_keys(country_ref()), $have));
      sort($options);
      $totB = array_sum(array_column($list, 'beneficiaries'));
      $totU = array_sum(array_column($list, 'universities'));
  ?>
    <div class="card">
      <h2>World reach: beneficiaries by country of study</h2>
      <small>These figures drive the world map section on the website. The countries are shown from largest to smallest automatically.</small>
      <p><strong><?= count($list) ?> countries, <?= number_format($totU) ?> universities, <?= number_format($totB) ?> beneficiaries</strong></p>
      <?php open_form('countries', $t); ?>
        <?php foreach ($list as $r => $c): ?>
          <div class="item">
            <input type="hidden" name="orig[<?= $r ?>]" value="<?= $r ?>">
            <input type="hidden" name="cname[<?= $r ?>]" value="<?= h($c['name']) ?>">
            <div class="row">
              <div><label>Country</label><input value="<?= h($c['name']) ?>" disabled></div>
              <div><label>Universities</label><input type="number" min="0" name="cu[<?= $r ?>]" value="<?= h($c['universities'] ?? 0) ?>"></div>
              <div><label>Beneficiaries</label><input type="number" min="0" name="cb[<?= $r ?>]" value="<?= h($c['beneficiaries'] ?? 0) ?>"></div>
            </div>
            <label class="del"><input type="checkbox" name="del[<?= $r ?>]" value="1"> Remove this country</label>
          </div>
        <?php endforeach; ?>
        <?php for ($k = 0; $k < 3; $k++): $r = count($list) + $k; ?>
          <div class="item">
            <h3>Add a country</h3>
            <input type="hidden" name="orig[<?= $r ?>]" value="">
            <div class="row">
              <div>
                <label>Country</label>
                <select name="cname[<?= $r ?>]" style="width:100%;padding:10px 12px;border:1px solid #cdd8e0;border-radius:10px;font-size:1rem">
                  <option value="">Choose a country…</option>
                  <?php foreach ($options as $o): ?><option value="<?= h($o) ?>"><?= h($o) ?></option><?php endforeach; ?>
                </select>
              </div>
              <div><label>Universities</label><input type="number" min="0" name="cu[<?= $r ?>]"></div>
              <div><label>Beneficiaries</label><input type="number" min="0" name="cb[<?= $r ?>]"></div>
            </div>
          </div>
        <?php endfor; ?>
        <button>Save countries</button>
      </form>
    </div>
    
  <?php elseif ($tab === 'careers'): $list = $content['careers'] ?? []; $list[] = []; $list[] = []; ?>
    <div class="card">
      <h2>Careers</h2>
      <small>Add a job in an empty row. Leave the list empty to show "no open roles".</small>
      <?php open_form('careers', $t); ?>
        <?php foreach ($list as $r => $c): $new = !isset($content['careers'][$r]); ?>
          <div class="item">
            <div class="row">
              <div><label>Job title</label><input name="title[<?= $r ?>]" value="<?= h($c['title'] ?? '') ?>"></div>
              <div><label>Location</label><input name="location[<?= $r ?>]" value="<?= h($c['location'] ?? '') ?>"></div>
              <div><label>Apply link or email (https://… or mailto:…)</label><input name="link[<?= $r ?>]" value="<?= h($c['link'] ?? '') ?>"></div>
            </div>
            <?php if (!$new): ?><label class="del"><input type="checkbox" name="del[<?= $r ?>]" value="1"> Remove this job</label><?php endif; ?>
          </div>
        <?php endforeach; ?>
        <button>Save careers</button>
      </form>
    </div>

  <?php elseif ($tab === 'links'): $list = $content['socials'] ?? []; $list[] = ['label' => '', 'url' => '']; ?>
    <div class="card">
      <h2>Social media links</h2>
      <small>Names that get their own icon: Facebook, X, LinkedIn, Instagram. To remove a link, clear its address.</small>
      <?php open_form('links', $t); ?>
        <?php foreach ($list as $r => $s): ?>
          <div class="row">
            <div><label>Name</label><input name="label[<?= $r ?>]" value="<?= h($s['label'] ?? '') ?>"></div>
            <div><label>Page address (https://…)</label><input name="url[<?= $r ?>]" value="<?= h($s['url'] ?? '') ?>"></div>
          </div>
        <?php endforeach; ?>
        <button>Save links</button>
      </form>
    </div>

  <?php else: ?>
    <div class="card">
      <h2>Change my password</h2>
      <?php open_form('password', $t); ?>
        <div class="row">
          <div><label>Current password</label><input type="password" name="current" required></div>
          <div><label>New password (10+ characters)</label><input type="password" name="new" required></div>
        </div>
        <button>Change password</button>
      </form>
    </div>
    <div class="card">
      <h2>Add another admin</h2>
      <small>Give a colleague their own login, so the site never depends on one person.</small>
      <?php open_form('adduser', $t); ?>
        <div class="row">
          <div><label>Username</label><input name="username" required></div>
          <div><label>Password (10+ characters)</label><input type="password" name="password" required></div>
        </div>
        <button>Add admin</button>
      </form>
      <p><small>Current admins: <?= h(implode(', ', array_column($users, 'username'))) ?></small></p>
    </div>
  <?php endif; ?>
<?php endif; ?>
</main>
</body>
</html>