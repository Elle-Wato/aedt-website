<?php
declare(strict_types=1);

const DATA_DIR = __DIR__ . '/data';

function read_json(string $file, $default) {
    $path = DATA_DIR . '/' . $file;
    if (!is_file($path)) return $default;
    $data = json_decode((string)file_get_contents($path), true);
    return $data ?? $default;
}

function write_json(string $file, $data, bool $backup = true): void {
    $path = DATA_DIR . '/' . $file;
    if (!is_dir(DATA_DIR . '/backups')) mkdir(DATA_DIR . '/backups', 0775, true);
    if ($backup && is_file($path)) {
        copy($path, DATA_DIR . '/backups/' . date('Ymd-His') . '-' . $file);
        $old = glob(DATA_DIR . '/backups/*-' . $file) ?: [];
        sort($old);
        foreach (array_slice($old, 0, max(0, count($old) - 30)) as $f) @unlink($f);
    }
    file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX);
}

function h($s): string {
    return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8');
}