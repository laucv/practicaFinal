<?php
/**
 * PHP version 7.2
 * src\routes.php
 */

use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Http\StatusCode;
use TDW\GCuest\Controller\CuestionController;
use TDW\GCuest\Controller\SolutionController;
use TDW\GCuest\Controller\LoginController;
use TDW\GCuest\Controller\UsuarioController;
use TDW\GCuest\Controller\PropuestaSolucionController;
use TDW\GCuest\Controller\RazonamientoController;
use TDW\GCuest\Controller\PropuestaRazonamientoController;

/**
 * @var \Slim\App $app
 */
$app->get(
    '/',
    function (Request $request, Response $response): Response {
        // Log message
        $this->get('logger')->info(
            $request->getMethod() . ' ' . $request->getUri()->getPath(),
            [ 'uid' => 0, 'status' => StatusCode::HTTP_MOVED_PERMANENTLY ]
        );

        // Redirect index view
        return $response
            ->withRedirect('/api-docs/index.html');
    }
);

/**
 * POST /login
 */
$app->post(
    $_ENV['RUTA_LOGIN'],
    LoginController::class . ':post'
)->setName('tdw_post_login');

/**
 * ############################################################
 * Usuario routes
 * ############################################################
 */

// CGET: Returns all users
$app->get(
    $_ENV['RUTA_API'] . UsuarioController::PATH_USUARIOS,
    UsuarioController::class . ':cget'
)->setName('tdw_cget_users');

// GET: Returns a user based on a single ID
$app->get(
    $_ENV['RUTA_API'] . UsuarioController::PATH_USUARIOS . '/{id:[0-9]+}',
    UsuarioController::class . ':get'
)->setName('tdw_get_users');

// GET: Returns status code 204 if username exists
$app->get(
    $_ENV['RUTA_API'] . UsuarioController::PATH_USUARIOS . '/username/{username:[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\.-]+}',
    UsuarioController::class . ':getUsername'
)->setName('tdw_get_user_name');

// DELETE: Deletes a user
$app->delete(
    $_ENV['RUTA_API'] . UsuarioController::PATH_USUARIOS . '/{id:[0-9]+}',
    UsuarioController::class . ':delete'
)->setName('tdw_delete_users');

// OPTIONS: Provides the list of HTTP supported methods
$app->options(
    $_ENV['RUTA_API'] . UsuarioController::PATH_USUARIOS . '[/{id:[0-9]+}]',
    UsuarioController::class . ':options'
)->setName('tdw_options_users');

// POST: Creates a new user
$app->post(
    $_ENV['RUTA_API'] . UsuarioController::PATH_USUARIOS,
    UsuarioController::class . ':post'
)->setName('tdw_post_users');

// PUT: Updates a user
$app->put(
    $_ENV['RUTA_API'] . UsuarioController::PATH_USUARIOS . '/{id:[0-9]+}',
    UsuarioController::class . ':put'
)->setName('tdw_put_users');

/**
 * ############################################################
 * Cuestion routes
 * ############################################################
 */

// CGET: Returns all questions
$app->get(
    $_ENV['RUTA_API'] . '/questions',
    CuestionController::class . ':cget'
)->setName('tdw_cget_questions');

// GET: Returns a question based on a single ID
$app->get(
    $_ENV['RUTA_API'] . '/questions/{id:[0-9]+}',
    CuestionController::class . ':get'
)->setName('tdw_get_questions');

// DELETE: Deletes a question
$app->delete(
    $_ENV['RUTA_API'] . '/questions/{id:[0-9]+}',
    CuestionController::class . ':delete'
)->setName('tdw_delete_questions');

// OPTIONS: Provides the list of HTTP supported methods
$app->options(
    $_ENV['RUTA_API'] . '/questions[/{id:[0-9]+}]',
    CuestionController::class . ':options'
)->setName('tdw_options_questions');

// POST: Creates a new question
$app->post(
    $_ENV['RUTA_API'] . '/questions',
    CuestionController::class . ':post'
)->setName('tdw_post_questions');

// PUT: Updates a question
$app->put(
    $_ENV['RUTA_API'] . '/questions/{id:[0-9]+}',
    CuestionController::class . ':put'
)->setName('tdw_put_questions');
/**
 * ############################################################
 * Solucion routes
 * ############################################################
 */

// CGET: Returns all solutions
$app->get(
    $_ENV['RUTA_API'] . '/solutions',
    SolutionController::class . ':cget'
)->setName('tdw_cget_solutions');

// GET: Returns a solution based on a single ID
$app->get(
    $_ENV['RUTA_API'] . '/solutions/{id:[0-9]+}',
    SolutionController::class . ':get'
)->setName('tdw_get_solutions');

// DELETE: Deletes a solution
$app->delete(
    $_ENV['RUTA_API'] . '/solutions/{id:[0-9]+}',
    SolutionController::class . ':delete'
)->setName('tdw_delete_solutions');

// OPTIONS: Provides the list of HTTP supported methods
$app->options(
    $_ENV['RUTA_API'] . '/solutions[/{id:[0-9]+}]',
    SolutionController::class . ':options'
)->setName('tdw_options_solutions');

// POST: Creates a new solution
$app->post(
    $_ENV['RUTA_API'] . '/solutions',
    SolutionController::class . ':post'
)->setName('tdw_post_solutions');

// PUT: Updates a solution
$app->put(
    $_ENV['RUTA_API'] . '/solutions/{id:[0-9]+}',
    SolutionController::class . ':put'
)->setName('tdw_put_solutions');
/**
 * ############################################################
 * Razonamiento routes
 * ############################################################
 */

// CGET: Returns all reasons
$app->get(
    $_ENV['RUTA_API'] . '/reasons',
    RazonamientoController::class . ':cget'
)->setName('tdw_cget_reasons');

// GET: Returns a reason based on a single ID
$app->get(
    $_ENV['RUTA_API'] . '/reasons/{id:[0-9]+}',
    RazonamientoController::class . ':get'
)->setName('tdw_get_reasons');

// DELETE: Deletes a reason
$app->delete(
    $_ENV['RUTA_API'] . '/reasons/{id:[0-9]+}',
    RazonamientoController::class . ':delete'
)->setName('tdw_delete_reasons');

// OPTIONS: Provides the list of HTTP supported methods
$app->options(
    $_ENV['RUTA_API'] . '/reasons[/{id:[0-9]+}]',
    RazonamientoController::class . ':options'
)->setName('tdw_options_reasons');

// POST: Creates a new reason
$app->post(
    $_ENV['RUTA_API'] . '/reasons',
    RazonamientoController::class . ':post'
)->setName('tdw_post_reasons');

// PUT: Updates a reason
$app->put(
    $_ENV['RUTA_API'] . '/reasons/{id:[0-9]+}',
    RazonamientoController::class . ':put'
)->setName('tdw_put_reasons');

/**
 * ############################################################
 * Propuesta Solucion routes
 * ############################################################
 */

// CGET: Returns all solutions
$app->get(
    $_ENV['RUTA_API'] . '/solutionsProposal',
    PropuestaSolucionController::class . ':cget'
)->setName('tdw_cget_solutionsProposal');

// GET: Returns a solution based on a single ID
$app->get(
    $_ENV['RUTA_API'] . '/solutionsProposal/{id:[0-9]+}',
    PropuestaSolucionController::class . ':get'
)->setName('tdw_get_solutionsProposal');

// DELETE: Deletes a solution
$app->delete(
    $_ENV['RUTA_API'] . '/solutionsProposal/{id:[0-9]+}',
    PropuestaSolucionController::class . ':delete'
)->setName('tdw_delete_solutionsProposal');

// OPTIONS: Provides the list of HTTP supported methods
$app->options(
    $_ENV['RUTA_API'] . '/solutionsProposal[/{id:[0-9]+}]',
    PropuestaSolucionController::class . ':options'
)->setName('tdw_options_solutionsProposal');

// POST: Creates a new solution
$app->post(
    $_ENV['RUTA_API'] . '/solutionsProposal',
    PropuestaSolucionController::class . ':post'
)->setName('tdw_post_solutionsProposal');

// PUT: Updates a solution
$app->put(
    $_ENV['RUTA_API'] . '/solutionsProposal/{id:[0-9]+}',
    PropuestaSolucionController::class . ':put'
)->setName('tdw_put_solutionsProposal');
/**
 * ############################################################
 * Propuesta Razonamiento routes
 * ############################################################
 */

// CGET: Returns all reasons
$app->get(
    $_ENV['RUTA_API'] . '/reasonsProposal',
    PropuestaRazonamientoController::class . ':cget'
)->setName('tdw_cget_reasonsProposal');

// GET: Returns a reason based on a single ID
$app->get(
    $_ENV['RUTA_API'] . '/reasonsProposal/{id:[0-9]+}',
    PropuestaRazonamientoController::class . ':get'
)->setName('tdw_get_reasonsProposal');

// DELETE: Deletes a reason
$app->delete(
    $_ENV['RUTA_API'] . '/reasonsProposal/{id:[0-9]+}',
    PropuestaRazonamientoController::class . ':delete'
)->setName('tdw_delete_reasonsProposal');

// OPTIONS: Provides the list of HTTP supported methods
$app->options(
    $_ENV['RUTA_API'] . '/reasonsProposal[/{id:[0-9]+}]',
    PropuestaRazonamientoController::class . ':options'
)->setName('tdw_options_reasonsProposal');

// POST: Creates a new reason
$app->post(
    $_ENV['RUTA_API'] . '/reasonsProposal',
    PropuestaRazonamientoController::class . ':post'
)->setName('tdw_post_reasonsProposal');

// PUT: Updates a reason
$app->put(
    $_ENV['RUTA_API'] . '/reasonsProposal/{id:[0-9]+}',
    PropuestaRazonamientoController::class . ':put'
)->setName('tdw_put_reasonsProposal');