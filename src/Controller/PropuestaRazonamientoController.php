<?php


namespace TDW\GCuest\Controller;

use Psr\Container\ContainerInterface;
use TDW\GCuest\Entity\PropuestaRazonamiento;
use TDW\GCuest\Entity\Solucion;
use OpenApi\Annotations as OA;
use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Http\StatusCode;
use TDW\GCuest\Entity\Usuario;
use TDW\GCuest\Error;
use TDW\GCuest\Utils;

/**
 * Class PropuestaRazonamientoController
 */
class PropuestaRazonamientoController
{
    /** @var string ruta api gestión soluciones  */
    public const PATH_USUARIOS = '/propuestaRazonamiento';

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
     *     path        = "/reasonsProposal",
     *     tags        = { "ReasonsProposal" },
     *     summary     = "Returns all reasons Proposal",
     *     description = "Returns all reasons Proposal from the system that the user has access to.",
     *     operationId = "tdw_cget_reasonsProposal",
     *     security    = {
     *          { "TDWApiSecurity": {} }
     *     },
     *     @OA\Response(
     *          response    = 200,
     *          description = "Array of reasons Proposal",
     *          @OA\JsonContent(
     *              ref  = "#/components/schemas/ReasonProposalArray"
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
        $propuestaRazonamiento = $this->jwt->isAdmin
            ? $entity_manager->getRepository(PropuestaRazonamiento::class)
                ->findAll()
            : $entity_manager->getRepository(PropuestaRazonamiento::class)
                ->findBy([ 'user' => $this->jwt->user_id ]);

        if (0 === count($propuestaRazonamiento)) {    // 404
            return Error::error($this->container, $request, $response, StatusCode::HTTP_NOT_FOUND);
        }

        $this->logger->info(
            $request->getMethod() . ' ' . $request->getUri()->getPath(),
            [ 'uid' => $this->jwt->user_id, 'status' => StatusCode::HTTP_OK ]
        );

        return $response
            ->withJson(
                [ 'propuestaRazonamiento' => $propuestaRazonamiento ],
                StatusCode::HTTP_OK // 200
            );
    }

    /**
     * Summary: Returns a reason Proposal based on a single ID
     *
     * @OA\Get(
     *     path        = "/reasonsProposal/{reasonProposalId}",
     *     tags        = { "ReasonsProposal" },
     *     summary     = "Returns a reason Proposal based on a single ID",
     *     description = "Returns the reason Proposal identified by `reasonProposalId`.",
     *     operationId = "tdw_get_reasonsProposal",
     *     @OA\Parameter(
     *          ref    = "#/components/parameters/reasonProposalId"
     *     ),
     *     security    = {
     *          { "TDWApiSecurity": {} }
     *     },
     *     @OA\Response(
     *          response    = 200,
     *          description = "ReasonProposal",
     *          @OA\JsonContent(
     *              ref  = "#/components/schemas/ReasonProposal"
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
        $propuestaRazonamiento = $entity_manager->find(PropuestaRazonamiento::class, $args['id']);

        if (null === $propuestaRazonamiento) {
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
                $propuestaRazonamiento,
                StatusCode::HTTP_OK // 200
            );
    }

    /**
     * Summary: Deletes a reason Proposal
     *
     * @OA\Delete(
     *     path        = "/reasonsProposal/{reasonProposalId}",
     *     tags        = { "ReasonsProposal" },
     *     summary     = "Deletes a reason Proposal",
     *     description = "Deletes the reason Proposal identified by `reasonProposalId`.",
     *     operationId = "tdw_delete_reasonsProposal",
     *     parameters={
     *          { "$ref" = "#/components/parameters/reasonProposalId" }
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
        $propuestaRazonamiento = $entity_manager->find(PropuestaRazonamiento::class, $args['id']);

        if (null === $propuestaRazonamiento) {    // 404
            return Error::error($this->container, $request, $response, StatusCode::HTTP_NOT_FOUND);
        }

        $this->logger->info(
            $request->getMethod() . ' ' . $request->getUri()->getPath(),
            [
                'uid' => $this->jwt->user_id,
                'status' => StatusCode::HTTP_NO_CONTENT
            ]
        );
        $entity_manager->remove($propuestaRazonamiento);
        $entity_manager->flush();

        return $response->withStatus(StatusCode::HTTP_NO_CONTENT);  // 204

    }

    /**
     * Summary: Provides the list of HTTP supported methods
     *
     * @OA\Options(
     *     path        = "/reasonsProposal",
     *     tags        = { "ReasonsProposal" },
     *     summary     = "Provides the list of HTTP supported methods",
     *     description = "Return a `Allow` header with a comma separated list of HTTP supported methods.",
     *     operationId = "tdw_options_reasonsProposal",
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
     *     path        = "/reasonsProposal/{reasonProposalId}",
     *     tags        = { "ReasonsProposal" },
     *     summary     = "Provides the list of HTTP supported methods",
     *     description = "Return a `Allow` header with a comma separated list of HTTP supported methods.",
     *     operationId = "tdw_options_reasonsProposal_id",
     *     parameters={
     *          { "$ref" = "#/components/parameters/reasonProposalId" },
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
     * Summary: Creates a new reason proposal
     *
     * @OA\Post(
     *     path        = "/reasonsProposal",
     *     tags        = { "ReasonProposal" },
     *     summary     = "Creates a new reason Proposal",
     *     description = "Creates a new reason Proposal",
     *     operationId = "tdw_post_reasonsProposal",
     *     @OA\RequestBody(
     *         description = "`ReasonProposal` properties to add to the system",
     *         required    = true,
     *         @OA\JsonContent(
     *             ref = "#/components/schemas/ReasonProposalData"
     *         )
     *     ),
     *     security    = {
     *          { "TDWApiSecurity": {} }
     *     },
     *     @OA\Response(
     *          response    = 201,
     *          description = "`Created`: solution Proposal created",
     *          @OA\JsonContent(
     *              ref  = "#/components/schemas/SolutionProposal"
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

        $solucion= (isset($req_data["solucion"])) ? $entity_manager->find(Solucion::class, $req_data["solucion"]) : null;
        $user = (isset($req_data["user"])) ? $entity_manager->find(Usuario::class, $req_data["user"]) : null;


        if($solucion === null || $user === null){ //La cuestion no existe
            return Error::error($this->container, $request, $response, StatusCode::HTTP_CONFLICT);
        }

        // 201
        $propuestaRazonamiento = new PropuestaRazonamiento(
            $req_data['textoPropuestaRazonamiento'],
            $req_data['propuestaRazonamientoJustificado'] ?? false,
            $solucion,
            $user

        );
        $entity_manager->persist($propuestaRazonamiento);
        $entity_manager->flush();

        $this->logger->info(
            $request->getMethod() . ' ' . $request->getUri()->getPath(),
            [
                'uid' => $this->jwt->user_id,
                'status' => StatusCode::HTTP_CREATED
            ]
        );

        return $response->withJson($propuestaRazonamiento, StatusCode::HTTP_CREATED); // 201
    }

    /**
     * Summary: Updates a reason
     *
     * @OA\Put(
     *     path        = "/reasonsProposal/{reasonProposalId}",
     *     tags        = { "ReasonsProposal" },
     *     summary     = "Updates a reason Proposal",
     *     description = "Updates the reason Proposal identified by `reasonProposalId`.",
     *     operationId = "tdw_put_reasonsProposal",
     *     @OA\Parameter(
     *          ref    = "#/components/parameters/reasonProposalId"
     *     ),
     *     @OA\RequestBody(
     *         description = "`ReasonProposal` data to update",
     *         required    = true,
     *         @OA\JsonContent(
     *             ref = "#/components/schemas/ReasonProposalData"
     *         )
     *     ),
     *     security    = {
     *          { "TDWApiSecurity": {} }
     *     },
     *     @OA\Response(
     *          response    = 209,
     *          description = "`Content Returned`: solution previously existed and is now updated",
     *          @OA\JsonContent(
     *              ref = "#/components/schemas/ReasonProposal"
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

        $propuestaRazonamiento = $entity_manager->find(PropuestaRazonamiento::class, $args['id']);

        if (null === $propuestaRazonamiento) {    // 404
            return Error::error($this->container, $request, $response, StatusCode::HTTP_NOT_FOUND);
        }

        if (isset($req_data['textoPropuestaRazonamiento'])) {///////
            $propuestaRazonamiento->setTextoPropuestaRazonamiento($req_data['textoPropuestaRazonamiento']);
        }
        if (isset($req_data['propuestaRazonamientoJustificado'])) {
            $propuestaRazonamiento->setPropuestaRazonamientoJustificado($req_data['propuestaRazonamientoJustificado']);
        }

        if (isset($req_data['solucion'])) {
            $solucion = (isset($req_data["solucion"])) ? $entity_manager->find(Solucion::class, $req_data["solucion"]) : null;
            if(null === $solucion){ //solucion no existe
                return Error::error($this->container, $request, $response, StatusCode::HTTP_CONFLICT);
            }
            $propuestaRazonamiento->setSolucion($solucion);
        }

        if (isset($req_data['user'])) {
            $user = (isset($req_data["user"])) ? $entity_manager->find(Usuario::class, $req_data["user"]) : null;
            if(null === $user){ //usuario no existe
                return Error::error($this->container, $request, $response, StatusCode::HTTP_CONFLICT);
            }
            $propuestaRazonamiento->setUser($user);
        }

        //$entity_manager->merge($propuestaRazonamiento);
        $entity_manager->flush();

        $this->logger->info(
            $request->getMethod() . ' ' . $request->getUri()->getPath(),
            [ 'uid' => $this->jwt->user_id, 'status' => StatusCode::HTTP_OK ]
        );

        return $response->withJson($propuestaRazonamiento)->withStatus(209, 'Content Returned');
    }
}
