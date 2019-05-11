<?php
/**
 * PHP version 7.2
 * apiTDWUsers - src/Controller/CuestionController.php
 */

namespace TDW\GCuest\Controller;

use OpenApi\Annotations as OA;
use Psr\Container\ContainerInterface;
use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Http\StatusCode;
use TDW\GCuest\Entity\Solucion;
use TDW\GCuest\Entity\Cuestion;
use TDW\GCuest\Error;
use TDW\GCuest\Utils;

/**
 * Class SolutionController
 */
class SolutionController
{
    /** @var string ruta api gestión cuestiones  */
    public const PATH_USUARIOS = '/soluction';

    /** @var ContainerInterface $container */
    protected $container;

    /** @var \Firebase\JWT\JWT */
    protected $jwt;

    /** @var \Monolog\Logger $logger */
    protected $logger;

    // constructor receives container instance
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
        $this->jwt = $this->container->get('jwt');
        $this->logger = $this->container->get('logger');
    }

    /**
     * Summary: Returns all solutions
     *
     * @OA\Get(
     *     path        = "/solutions",
     *     tags        = { "Solutions" },
     *     summary     = "Returns all solutions",
     *     description = "Returns all solutions from the system that the user has access to.",
     *     operationId = "tdw_cget_solutions",
     *     security    = {
     *          { "TDWApiSecurity": {} }
     *     },
     *     @OA\Response(
     *          response    = 200,
     *          description = "Array of solutions",
     *          @OA\JsonContent(
     *              ref  = "#/components/schemas/SolutionsArray"
     *         )
     *     ),
     *     @OA\Response(
     *          response    = 401,
     *          ref         = "#/components/responses/401_Standard_Response"
     *     ),
     *     @OA\Response(
     *          response    = 403,
     *          ref         = "#/components/responses/403_Forbidden_Response"
     *     ),
     *     @OA\Response(
     *          response    = 404,
     *          ref         = "#/components/responses/404_Resource_Not_Found_Response"
     *     )
     * )
     * @param Request $request
     * @param Response $response
     * @return Response
     */
    public function cget(Request $request, Response $response): Response
    {
        if (0 === $this->jwt->user_id) { //403
            return Error::error($this->container, $request, $response, StatusCode::HTTP_FORBIDDEN);
        }
        $entity_manager = Utils::getEntityManager();
        $soluciones = $this->jwt->isAdmin
            ? $entity_manager->getRepository(Solucion::class)
                ->findAll()
            : $entity_manager->getRepository(Solution::class)
                ->findBy([ 'id' => $this->jwt->user_id ]);

        if (0 === count($soluciones)) {    // 404
            return Error::error($this->container, $request, $response, StatusCode::HTTP_NOT_FOUND);
        }

        $this->logger->info(
            $request->getMethod() . ' ' . $request->getUri()->getPath(),
            [ 'uid' => $this->jwt->user_id, 'status' => StatusCode::HTTP_OK ]
        );

        return $response
            ->withJson(
                [ 'soluciones' => $soluciones ],
                StatusCode::HTTP_OK // 200
            );
    }

    /**
     * Summary: Returns a solution based on a single ID
     *
     * @OA\Get(
     *     path        = "/solutions/{solutionId}",
     *     tags        = { "Solutions" },
     *     summary     = "Returns a solution based on a single ID",
     *     description = "Returns the solution identified by `solutionId`.",
     *     operationId = "tdw_get_solutions",
     *     @OA\Parameter(
     *          ref    = "#/components/parameters/solutionId"
     *     ),
     *     security    = {
     *          { "TDWApiSecurity": {} }
     *     },
     *     @OA\Response(
     *          response    = 200,
     *          description = "Solution",
     *          @OA\JsonContent(
     *              ref  = "#/components/schemas/Solution"
     *         )
     *     ),
     *     @OA\Response(
     *          response    = 401,
     *          ref         = "#/components/responses/401_Standard_Response"
     *     ),
     *     @OA\Response(
     *          response    = 403,
     *          ref         = "#/components/responses/403_Forbidden_Response"
     *     ),
     *     @OA\Response(
     *          response    = 404,
     *          ref         = "#/components/responses/404_Resource_Not_Found_Response"
     *     )
     * )
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return Response
     */
    public function get(Request $request, Response $response, array $args): Response
    {
        if (0 === $this->jwt->user_id) {
            return Error::error($this->container, $request, $response, StatusCode::HTTP_FORBIDDEN);
        }
        $entity_manager = Utils::getEntityManager();
        $solucion = $entity_manager->find(Solucion::class, $args['id']);

        if (null === $solucion) {
            return Error::error($this->container, $request, $response, StatusCode::HTTP_NOT_FOUND);
        }

        $this->logger->info(
            $request->getMethod() . ' ' . $request->getUri()->getPath(),
            [
                'uid' => $this->jwt->user_id,
                'status' => StatusCode::HTTP_OK
            ]
        );

        return $response
            ->withJson(
                $solucion,
                StatusCode::HTTP_OK // 200
            );
    }

    /**
     * Summary: Deletes a solution
     *
     * @OA\Delete(
     *     path        = "/solutions/{solutionId}",
     *     tags        = { "Solutions" },
     *     summary     = "Deletes a solution",
     *     description = "Deletes the solution identified by `solutionId`.",
     *     operationId = "tdw_delete_solutions",
     *     parameters={
     *          { "$ref" = "#/components/parameters/solutionId" }
     *     },
     *     security    = {
     *          { "TDWApiSecurity": {} }
     *     },
     *     @OA\Response(
     *          response    = 204,
     *          description = "Solution deleted &lt;Response body is empty&gt;"
     *     ),
     *     @OA\Response(
     *          response    = 401,
     *          ref         = "#/components/responses/401_Standard_Response"
     *     ),
     *     @OA\Response(
     *          response    = 403,
     *          ref         = "#/components/responses/403_Forbidden_Response"
     *     ),
     *     @OA\Response(
     *          response    = 404,
     *          ref         = "#/components/responses/404_Resource_Not_Found_Response"
     *     )
     * )
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return Response
     */
    public function delete(Request $request, Response $response, array $args): Response
    {
        if (!$this->jwt->isMaestro) { // 403
            return Error::error($this->container, $request, $response, StatusCode::HTTP_FORBIDDEN);
        }

        $entity_manager = Utils::getEntityManager();
        $solucion = $entity_manager->find(Solucion::class, $args['id']);

        if (null === $solucion) {    // 404
            return Error::error($this->container, $request, $response, StatusCode::HTTP_NOT_FOUND);
        }

        $this->logger->info(
            $request->getMethod() . ' ' . $request->getUri()->getPath(),
            [
                'uid' => $this->jwt->user_id,
                'status' => StatusCode::HTTP_NO_CONTENT
            ]
        );
        $entity_manager->remove($solucion);
        $entity_manager->flush();

        return $response->withStatus(StatusCode::HTTP_NO_CONTENT);  // 204

    }

    /**
     * Summary: Provides the list of HTTP supported methods
     *
     * @OA\Options(
     *     path        = "/solutions",
     *     tags        = { "Solutions" },
     *     summary     = "Provides the list of HTTP supported methods",
     *     description = "Return a `Allow` header with a comma separated list of HTTP supported methods.",
     *     operationId = "tdw_options_solutions",
     *     @OA\Response(
     *          response    = 200,
     *          description = "`Allow` header &lt;Response body is empty&gt;",
     *          @OA\Header(
     *              header      = "Allow",
     *              description = "List of HTTP supported methods",
     *              @OA\Schema(
     *                  type="string"
     *              )
     *          )
     *     )
     * )
     *
     * @OA\Options(
     *     path        = "/solutions/{solutionId}",
     *     tags        = { "Solutions" },
     *     summary     = "Provides the list of HTTP supported methods",
     *     description = "Return a `Allow` header with a comma separated list of HTTP supported methods.",
     *     operationId = "tdw_options_solutions_id",
     *     parameters={
     *          { "$ref" = "#/components/parameters/solutionId" },
     *     },
     *     @OA\Response(
     *          response    = 200,
     *          description = "`Allow` header &lt;Response body is empty&gt;",
     *          @OA\Header(
     *              header      = "Allow",
     *              description = "List of HTTP supported methods",
     *              @OA\Schema(
     *                  type="string"
     *              )
     *          )
     *     )
     * )
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return Response
     */
    public function options(Request $request, Response $response, array $args): Response
    {
        $this->logger->info(
            $request->getMethod() . ' ' . $request->getUri()->getPath()
        );

        $methods = isset($args['id'])
            ? [ 'GET', 'PUT', 'DELETE' ]
            : [ 'GET', 'POST' ];

        return $response
            ->withAddedHeader(
                'Allow',
                implode(', ', $methods)
            );
    }

    /**
     * Summary: Creates a new solution
     *
     * @OA\Post(
     *     path        = "/solutions",
     *     tags        = { "Solutions" },
     *     summary     = "Creates a new solution",
     *     description = "Creates a new solution",
     *     operationId = "tdw_post_solutions",
     *     @OA\RequestBody(
     *         description = "`Solution` properties to add to the system",
     *         required    = true,
     *         @OA\JsonContent(
     *             ref = "#/components/schemas/SolutionData"
     *         )
     *     ),
     *     security    = {
     *          { "TDWApiSecurity": {} }
     *     },
     *     @OA\Response(
     *          response    = 201,
     *          description = "`Created`: solution created",
     *          @OA\JsonContent(
     *              ref  = "#/components/schemas/Solution"
     *         )
     *     ),
     *     @OA\Response(
     *          response    = 401,
     *          ref         = "#/components/responses/401_Standard_Response"
     *     ),
     *     @OA\Response(
     *          response    = 403,
     *          ref         = "#/components/responses/403_Forbidden_Response"
     *     ),
     *     @OA\Response(
     *          response    = 409,
     *          description = "`Conflict`: the question does not exist",
     *          @OA\JsonContent(
     *              ref  = "#/components/schemas/Message",
     *              example          = {
     *                   "code"      = 409,
     *                   "message"   = "`Conflict`: the question does not exist "
     *              }
     *         )
     *     )
     * )
     * @param Request $request
     * @param Response $response
     * @return Response
     */
    public function post(Request $request, Response $response): Response
    {
        if (!$this->jwt->isMaestro) {
            return Error::error($this->container, $request, $response, StatusCode::HTTP_FORBIDDEN);
        }

        $req_data
            = $request->getParsedBody()
            ?? json_decode($request->getBody(), true);
        $entity_manager = Utils::getEntityManager();

        $cuestion= (isset($req_data["cuestion"])) ? $entity_manager->find(Cuestion::class, $req_data["cuestion"]) : null;

        if($cuestion === null ){ //La cuestion no existe
            return Error::error($this->container, $request, $response, StatusCode::HTTP_CONFLICT);
        }

        // 201
        $solucion = new Solucion(
            $req_data['textoSolucion'],
            $cuestion,
            $req_data['solucionCorrecta'] ?? false
        );
        $entity_manager->persist($solucion);
        $entity_manager->flush();

        $this->logger->info(
            $request->getMethod() . ' ' . $request->getUri()->getPath(),
            [
                'uid' => $this->jwt->user_id,
                'status' => StatusCode::HTTP_CREATED
            ]
        );

        return $response->withJson($solucion, StatusCode::HTTP_CREATED); // 201
    }

    /**
     * Summary: Updates a solution
     *
     * @OA\Put(
     *     path        = "/solutions/{solutionId}",
     *     tags        = { "Solutions" },
     *     summary     = "Updates a solution",
     *     description = "Updates the solution identified by `solutionId`.",
     *     operationId = "tdw_put_solutions",
     *     @OA\Parameter(
     *          ref    = "#/components/parameters/solutionId"
     *     ),
     *     @OA\RequestBody(
     *         description = "`Solution` data to update",
     *         required    = true,
     *         @OA\JsonContent(
     *             ref = "#/components/schemas/SolutionData"
     *         )
     *     ),
     *     security    = {
     *          { "TDWApiSecurity": {} }
     *     },
     *     @OA\Response(
     *          response    = 209,
     *          description = "`Content Returned`: solution previously existed and is now updated",
     *          @OA\JsonContent(
     *              ref = "#/components/schemas/Solution"
     *         )
     *     ),
     *     @OA\Response(
     *          response    = 401,
     *          ref         = "#/components/responses/401_Standard_Response"
     *     ),
     *     @OA\Response(
     *          response    = 403,
     *          ref         = "#/components/responses/403_Forbidden_Response"
     *     ),
     *     @OA\Response(
     *          response    = 404,
     *          ref         = "#/components/responses/404_Resource_Not_Found_Response"
     *     ),
     *     @OA\Response(
     *          response    = 409,
     *          description = "`Conflict`: the solution does not exis",
     *          @OA\JsonContent(
     *              ref  = "#/components/schemas/Message",
     *              example          = {
     *                   "code"      = 409,
     *                   "message"   = "`Conflict`: the solution does not exist"
     *              }
     *         )
     *     )
     * )
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return Response
     */
    public function put(Request $request, Response $response, array $args): Response
    {
        if (!$this->jwt->isMaestro) { // 403
            return Error::error($this->container, $request, $response, StatusCode::HTTP_FORBIDDEN);
        }

        $req_data
            = $request->getParsedBody()
            ?? json_decode($request->getBody(), true);
        $entity_manager = Utils::getEntityManager();
        $solucion= $entity_manager->find(Solucion::class, $args['id']);

        if (null === $solucion) {    // 404
            return Error::error($this->container, $request, $response, StatusCode::HTTP_NOT_FOUND);
        }
        if (isset($req_data['textoSolucion'])) {///////
            $solucion->setTextoSolucion($req_data['textoSolucion']);
        }
        if (isset($req_data['solucionCorrecta'])) {
            $solucion->setSolucionCorrecta($req_data['solucionCorrecta']);
        }

        if (isset($req_data['cuestion'])) {
            $cuestion = (isset($req_data["cuestion"])) ? $entity_manager->find(Cuestion::class, $req_data["cuestion"]) : null;
            if(null === $cuestion){ //cuestion no existe
                return Error::error($this->container, $request, $response, StatusCode::HTTP_CONFLICT);
            }
            $cuestion->setCuestion($cuestion);
        }


        //$entity_manager->merge($solucion);
        $entity_manager->flush();

        $this->logger->info(
            $request->getMethod() . ' ' . $request->getUri()->getPath(),
            [ 'uid' => $this->jwt->user_id, 'status' => StatusCode::HTTP_OK ]
        );

        return $response->withJson($solucion)->withStatus(209, 'Content Returned');
    }
}
