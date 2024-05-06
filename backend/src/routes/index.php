<?php
use function src\jwtAuth;
use function src\slimConfiguration;
use App\Controllers\AdminUsers\AdminUsersController;
use App\Controllers\Auth\AuthController;
use App\Controllers\Production\ProductionController;
use App\Controllers\AwaitingRelease\AwaitingReleaseController;
use App\Controllers\AwaitingShipment\AwaitingShipmentController;
use App\Controllers\CardsIssuedReport\CardsIssuedReportController;
use App\Controllers\Dispatched\DispatchedController;
use App\Controllers\Graph\GraphController;
use App\Controllers\Inactive\InactiveProductsController;
use App\Controllers\MonthReport\MonthReportController;
use App\Controllers\ProductionReport\ProductionReportController;
use App\Controllers\Stock\StockController;
use App\Controllers\Waste\WasteProductsController;
use App\Controllers\Ruptures\RupturesProductsController;
use App\DAO\VeroCard\CardsIssuedReport\CardsIssuedReportDAO;
use App\DAO\VeroCard\MonthReport\MonthReportDAO;
use App\Middlewares\adminConference;
use App\Middlewares\jwtDateTime;


$app = new \Slim\App(slimConfiguration());


$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});


// ================= Login ========================

$app->post('/login', AuthController::class . ':login');

$app->post('/refresh-token', AuthController::class . ':refreshToken');

$app->get('/decodfy', function ($request, $response) {
    $response = $response->withJson($request->getAttribute('jwt'));
})->add(new jwtDateTime())
    ->add(jwtAuth());

// ================================================


// ================== Production ==================


$app->post('/production', ProductionController::class . ':Productsinproduction')
    ->add(new jwtDateTime())
    ->add(jwtAuth());

// =================================================


// ================== Awaiting release =============

$app->get('/awaiting-release', AwaitingReleaseController::class . ':AwaitingRelease')
    ->add(new jwtDateTime())
    ->add(jwtAuth());

// ==================================================


// ================== Awaiting shipment =============

$app->get('/awaiting-shipment', AwaitingShipmentController::class . ':AwaitingShipment')
    ->add(new jwtDateTime())
    ->add(jwtAuth());
// ==================================================

// ================== Awaiting dispached =============

$app->get('/dispatched', DispatchedController::class . ':Dispatched')
    ->add(new jwtDateTime())
    ->add(jwtAuth());
// ==================================================



// ================== Produtos Inativos =============
$app->post('/inactive-products', InactiveProductsController::class . ':getInactiveProducts')
    ->add(new jwtDateTime())
    ->add(jwtAuth());
// =================================================

// ================== Produtos Rejeitados =============
$app->post('/waste-products', WasteProductsController::class . ':getWasteProducts')
    ->add(new jwtDateTime())
    ->add(jwtAuth());
// ==================================================

$app->post('/graph', GraphController::class . ':getGraph')
    ->add(new jwtDateTime())
    ->add(jwtAuth());

    

$app->post('/monthReport', MonthReportController::class . ':getMontReport')
    ->add(new jwtDateTime())
    ->add(jwtAuth());

$app->post('/ruptures-products', RupturesProductsController::class . ':getRupturesProducts')
    ->add(new jwtDateTime())
    ->add(jwtAuth());
// =================



// ================== Production Report =============

$app->post('/production-report', ProductionReportController::class . ':ProductionReport')
    ->add(new jwtDateTime())
    ->add(jwtAuth());

$app->post('/cardsissued-report', CardsIssuedReportController::class . ':CardsIssuedReport')
    ->add(new jwtDateTime())
    ->add(jwtAuth());


// ==================================================

// ================== Stock =============

$app->post('/stock', StockController::class . ':StockFilter')
    ->add(new jwtDateTime())
    ->add(jwtAuth());

// ==================================================

// ================== Users =============

$app->post('/users', AdminUsersController::class . ':createUsers')
    ->add(new adminConference())
    ->add(new jwtDateTime())
    ->add(jwtAuth());

$app->put('/users', AdminUsersController::class . ':editUsers')
    ->add(new adminConference())
    ->add(new jwtDateTime())
    ->add(jwtAuth());

$app->delete('/users/{id}', AdminUsersController::class . ':deleteUsers')
    ->add(new adminConference())
    ->add(new jwtDateTime())
    ->add(jwtAuth());

$app->post('/confirmEmail', AdminUsersController::class . ':emailVerification')
    ->add(new adminConference())
    ->add(new jwtDateTime())
    ->add(jwtAuth());

$app->post('/searchUser', AdminUsersController::class . ':UserSearchEmail')
    ->add(new adminConference())
    ->add(new jwtDateTime())
    ->add(jwtAuth());

$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
    $handler = $this->notFoundHandler; // handle using the default Slim page not found handler
    return $handler($req, $res);
});

// ==================================================


$app->run();
