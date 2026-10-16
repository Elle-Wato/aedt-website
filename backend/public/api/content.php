<?php
declare(strict_types=1);
require dirname(__DIR__, 2) . '/lib.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
echo json_encode(read_json('content.json', new stdClass), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);