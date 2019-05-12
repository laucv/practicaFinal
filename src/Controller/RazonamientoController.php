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
use TDW\GCuest\Entity\Razonamiento;
use TDW\GCuest\Entity\Solucion;
use TDW\GCuest\Error;
use TDW\GCuest\Utils;

/**
 * Class RazonamientoController
 */
class RazonamientoController{
    /** @var string ruta api gestión razonamiento  */
    public const PATH_USUARIOS = '/reasons';

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
     * Summary: Returns all reasons
     *
     * @OA\Get(
     *     path        = "/reasons",
     *     tags        = { "Reasons" },
     *     summary     = "Returns all reasons",
     *     description = "Returns all reasons from the system that the user has access to.",
     *     operationId = "tdw_cget_reasons",
     *     security    = {
     *          { "TDWApiSecurity": {} }
     *     },
     *     @OA\Response(
     *          response    = 200,
     *          description = "Array of reasons",
     *          @OA\JsonContent(
     *              ref  = "#/components/schemas/ReasonsArray"
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
        $razonamientos = $this->jwt->isAdmin
            ? $entity_manager->getRepository(Razonamiento::class)
                ->findAll()
            : $entity_manager->getRepository(Razonamiento::class)
                ->findBy([ 'id' => $this->jwt->user_id ]);

        if (0 === count($razonamientos)) {    // 404
            return Error::error($this->container, $request, $response, StatusCode::HTTP_NOT_FOUND);
        }

        $this->logger->info(
            $request->getMethod() . ' ' . $request->getUri()->getPath(),
            [ 'uid' => $this->jwt->user_id, 'status' => StatusCode::HTTP_OK ]
        );

        return $response
            ->withJson(
                [ 'razonamientos' => $razonamientos ],
                StatusCode::HTTP_OK // 200
            );
    }

    /**
     * Summary: Returns a reason based on a single ID
     *
     * @OA\Get(
     *     path        = "/reasons/{reasonsId}",
     *     tags        = { "Reasons" },
     *     summary     = "Returns a reason based on a single ID",
     *     description = "Returns the reason identified by `solutionId`.",
     *     operationId = "tdw_get_reasons",
     *     @OA\Parameter(
     *          ref    = "#/components/parameters/reasonId"
     *     ),
     *     security    = {
     *          { "TDWApiSecurity": {} }
     *     },
     *     @OA\Response(
     *          response    = 200,
     *          description = "Reason",
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
        $razonamiento= $entity_manager->find(Razonamiento::class, $args['id']);

        if (null === $razonamiento) {
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
                $razonamiento,
                StatusCode::HTTP_OK // 200
            );
    }

    /**
     * Summary: Deletes a reason
     *
     * @OA\Delete(
     *     path        = "/reasons/{reasonId}",
     *     tags        = { "Reasons" },
     *     summary     = "Deletes a reason",
     *     description = "Deletes the reason identified by `reasonId`.",
     *     operationId = "tdw_delete_reason",
     *     parameters={
     *          { "$ref" = "#/components/parameters/reasonId" }
     *     },
     *     security    = {
     *          { "TDWApiSecurity": {} }
     *     },
     *     @OA\Response(
     *          response    = 204,
     *          description = "Reason deleted &lt;Response body is empty&gt;"
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
        $razonamiento = $entity_manager->find(Razonamiento::class, $args['id']);

        if (null === $razonamiento) {    // 404
            return Error::error($this->container, $request, $response, StatusCode::HTTP_NOT_FOUND);
        }

        $this->logger->info(
            $request->getMethod() . ' ' . $request->getUri()->getPath(),
            [
                'uid' => $this->jwt->user_id,
                'status' => StatusCode::HTTP_NO_CONTENT
            ]
        );
        $entity_manager->remove($razonamiento);
        $entity_manager->flush();

        return $response->withStatus(StatusCode::HTTP_NO_CONTENT);  // 204

    }

    /**
     * Summary: Provides the list of HTTP supported methods
     *
     * @OA\Options(
     *     path        = "/reasons",
     *     tags        = { "Reasons" },
     *     summary     = "Provides the list of HTTP supported methods",
     *     description = "Return a `Allow` header with a comma separated list of HTTP supported methods.",
     *     operationId = "tdw_options_reasons",
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
     *     path        = "/reasons/{reasonId}",
     *     tags        = { "Reasons" },
     *     summary     = "Provides the list of HTTP supported methods",
     *     description = "Return a `Allow` header with a comma separated list of HTTP supported methods.",
     *     operationId = "tdw_options_reasons_id",
     *     parameters={
     *          { "$ref" = "#/components/parameters/reasonId" },
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
     * Summary: Creates a new reason
     *
     * @OA\Post(
     *     path        = "/reasons",
     *     tags        = { "Reasons" },
     *     summary     = "Creates a new reason",
     *     description = "Creates a new reason",
     *     operationId = "tdw_post_reasons",
     *     @OA\RequestBody(
     *         description = "`Reason` properties to add to the system",
     *         required    = true,
     *         @OA\JsonContent(
     *             ref = "#/components/schemas/ReasonData"
     *         )
     *     ),
     *     security    = {
     *          { "TDWApiSecurity": {} }
     *     },
     *     @OA\Response(
     *          response    = 201,
     *          description = "`Created`: reason created",
     *          @OA\JsonContent(
     *              ref  = "#/components/schemas/Reason"
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
     *          description = "`Conflict`: the solution does not exist",
     *          @OA\JsonContent(
     *              ref  = "#/components/schemas/Message",
     *              example          = {
     *                   "code"      = 409,
     *                   "message"   = "`Conflict`: the solution does not exist "
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

        $solucion= (isset($req_data["solucion"])) ? $entity_manager->find(Solucion::class, $req_data["solucion"]) : null;

        if($solucion === null ){ //La cuestion no existe
            return Error::error($this->container, $request, $response, StatusCode::HTTP_CONFLICT);
        }

        // 201
        $razonamiento = new Razonamiento(
            $req_data['textoRazonamiento'],
            $solucion,
            $req_data['razonamientoJustificado'] ?? false,
            $req_data['textoError']
        );
        $entity_manager->persist($razonamiento);
        $entity_manager->flush();

        $this->logger->info(
            $request->getMethod() . ' ' . $request->getUri()->getPath(),
            [
                'uid' => $this->jwt->user_id,
                'status' => StatusCode::HTTP_CREATED
            ]
        );

        return $response->withJson($razonamiento, StatusCode::HTTP_CREATED); // 201
    }

    /**
     * Summary: Updates a reason
     *
     * @OA\Put(
     *     path        = "/reasons/{reasonId}",
     *     tags        = { "Reasons" },
     *     summary     = "Updates a reason",
     *     description = "Updates the reason identified by `reasonId`.",
     *     operationId = "tdw_put_solutions",
     *     @OA\Parameter(
     *          ref    = "#/components/parameters/reasonId"
     *     ),
     *     @OA\RequestBody(
     *         description = "`Reason` data to update",
     *         required    = true,
     *         @OA\JsonContent(
     *             ref = "#/components/schemas/ReasonData"
     *         )
     *     ),
     *     security    = {
     *          { "TDWApiSecurity": {} }
     *     },
     *     @OA\Response(
     *          response    = 209,
     *          description = "`Content Returned`: reason previously existed and is now updated",
     *          @OA\JsonContent(
     *              ref = "#/components/schemas/Reason"
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
        $razonamiento= $entity_manager->find(Razonamiento::class, $args['id']);

        if (null === $razonamiento) {    // 404
            return Error::error($this->container, $request, $response, StatusCode::HTTP_NOT_FOUND);
        }
        if (isset($req_data['textoRazonamiento'])) {///////
            $razonamiento->setTextoRazonamiento($req_data['textoRazonamiento']);
        }
        if (isset($req_data['razonamientoJustificado'])) {
            $razonamiento->setRazonamientoJustificado($req_data['razonamientoJustificado']);
        }

        if (isset($req_data['solucion'])) {
            $solucion = (isset($req_data["solucion"])) ? $entity_manager->find(Solucion::class, $req_data["solucion"]) : null;
            if(null === $solucion){ //cuestion no existe
                return Error::error($this->container, $request, $response, StatusCode::HTTP_CONFLICT);
            }
            $solucion->setSolucion($solucion);
        }
        if (isset($req_data['textoError'])) {///////
            $razonamiento->setTextoError($req_data['textoError']);
        }

        //$entity_manager->merge($razonamiento);
        $entity_manager->flush();

        $this->logger->info(
            $request->getMethod() . ' ' . $request->getUri()->getPath(),
            [ 'uid' => $this->jwt->user_id, 'status' => StatusCode::HTTP_OK ]
        );

        return $response->withJson($razonamiento)->withStatus(209, 'Content Returned');
    }
}
