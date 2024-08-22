<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Allow all origins or specify the exact origin if needed
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$file = 'data/employees.json';

if (!file_exists($file)) {
    echo json_encode(["error" => "File not found"]);
    exit();
}

$data = json_decode(file_get_contents($file), true);

switch ($method) {
    case 'GET':
        echo json_encode($data);
        break;
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $data[] = $input;
        file_put_contents($file, json_encode($data));
        echo json_encode($input);
        break;
    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        $data = array_map(function ($item) use ($input) {
            return $item['empId'] === $input['empId'] ? $input : $item;
        }, $data);
        file_put_contents($file, json_encode($data));
        echo json_encode($input);
        break;
    case 'DELETE':
        $input = json_decode(file_get_contents('php://input'), true);
        $data = array_filter($data, function ($item) use ($input) {
            return $item['empId'] !== $input['empId'];
        });
        file_put_contents($file, json_encode(array_values($data)));
        echo json_encode(["status" => "Deleted"]);
        break;
    default:
        echo json_encode(["error" => "Unsupported request method"]);
        break;
}
