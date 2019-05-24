<?php


namespace TDW\GCuest\Controller;

use OpenApi\Annotations as OA;
use Psr\Container\ContainerInterface;
use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Http\StatusCode;
use TDW\GCuest\Entity\PropuestaSolucion;
use TDW\GCuest\Entity\Solucion;
use TDW\GCuest\Entity\Cuestion;
use TDW\GCuest\Entity\Usuario;
use TDW\GCuest\Error;
use TDW\GCuest\Utils;

/**
 * Class PropuestaSolucionController
 */
class PropuestaSolucionController
{
    /** @var string ruta api gestión soluciones  */
    public const PATH_USUARIOS = '/propuestaSolucion';

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
     *     path        = "/solutionsProposal",
     *     tags        = { "SolutionsProposal" },
     *     summary     = "Returns all solutions Proposal",
     *     description = "Returns all solutions Proposal from the system that the user has access to.",
     *     operationId = "tdw_cget_solutionsProposal",
     *     security    = {
     *          { "TDWApiSecurity": {} }
     *     },
     *     @OA\Response(
     *          response    = 200,
     *          description = "Array of solutions Proposal",
     *          @OA\JsonContent(
     *              ref  = "#/components/schemas/SolutionProposalArray"
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
        $propuestaSoluciones = $this->jwt->isAdmin
            ? $entity_manager->getRepository(PropuestaSolucion::class)
                ->findAll()
            : $entity_manager->getRepository(PropuestaSolucion::class)
                ->findBy([ 'user' => $this->jwt->user_id ]);

        if (0 === count($propuestaSoluciones)) {    // 404
            return Error::error($this->container, $request, $response, StatusCode::HTTP_NOT_FOUND);
        }

        $this->logger->info(
            $request->getMethod() . ' ' . $request->getUri()->getPath(),
            [ 'uid' => $this->jwt->user_id, 'status' => StatusCode::HTTP_OK ]
        );

        return $response
            ->withJson(
                [ 'propuestaSoluciones' => $propuestaSoluciones ],
                StatusCode::HTTP_OK // 200
            );
    }

    /**
     * Summary: Returns a solution Proposal based on a single ID
     *
     * @OA\Get(
     *     path        = "/solutionsProposal/{solutionProposalId}",
     *     tags        = { "SolutionsProposal" },
     *     summary     = "Returns a solution Proposal based on a single ID",
     *     description = "Returns the solution Proposal identified by `solutionProposalId`.",
     *     operationId = "tdw_get_solutionsProposal",
     *     @OA\Parameter(
     *          ref    = "#/components/parameters/solutionProposalId"
     *     ),
     *     security    = {
     *          { "TDWApiSecurity": {} }
     *     },
     *     @OA\Response(
     *          response    = 200,
     *          description = "SolutionProposal",
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
        $propuestaSolucion = $entity_manager->find(PropuestaSolucion::class, $args['id']);

        if (null === $propuestaSolucion) {
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
                $propuestaSolucion,
                StatusCode::HTTP_OK // 200
            );
    }

    /**
     * Summary: Deletes a solution Proposal
     *
     * @OA\Delete(
     *     path        = "/solutionsProposal/{solutionProposalId}",
     *     tags        = { "SolutionsProposal" },
     *     summary     = "Deletes a solution Proposal",
     *     description = "Deletes the solution Proposal identified by `solutionProposalId`.",
     *     operationId = "tdw_delete_solutionsProposal",
     *     parameters={
     *          { "$ref" = "#/components/parameters/solutionProposalId" }
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
        $propuestaSolucion = $entity_manager->find(PropuestaSolucion::class, $args['id']);

        if (null === $propuestaSolucion) {    // 404
            return Error::error($this->container, $request, $response, StatusCode::HTTP_NOT_FOUND);
        }

        $this->logger->info(
            $request->getMethod() . ' ' . $request->getUri()->getPath(),
            [
                'uid' => $this->jwt->user_id,
                'status' => StatusCode::HTTP_NO_CONTENT
            ]
        );
        $entity_manager->remove($propuestaSolucion);
        $entity_manager->flush();

        return $response->withStatus(StatusCode::HTTP_NO_CONTENT);  // 204

    }

    /**
     * Summary: Provides the list of HTTP supported methods
     *
     * @OA\Options(
     *     path        = "/solutionsProposal",
     *     tags        = { "SolutionsProposal" },
     *     summary     = "Provides the list of HTTP supported methods",
     *     description = "Return a `Allow` header with a comma separated list of HTTP supported methods.",
     *     operationId = "tdw_options_solutionsProposal",
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
     *     path        = "/solutionsProposal/{solutionProposalId}",
     *     tags        = { "SolutionsProposal" },
     *     summary     = "Provides the list of HTTP supported methods",
     *     description = "Return a `Allow` header with a comma separated list of HTTP supported methods.",
     *     operationId = "tdw_options_solutionsProposal_id",
     *     parameters={
     *          { "$ref" = "#/components/parameters/solutionProposalId" },
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
     *     path        = "/solutionsProposal",
     *     tags        = { "SolutionsProposal" },
     *     summary     = "Creates a new solution Proposal",
     *     description = "Creates a new solution Proposal",
     *     operationId = "tdw_post_solutionsProposal",
     *     @OA\RequestBody(
     *         description = "`SolutionProposal` properties to add to the system",
     *         required    = true,
     *         @OA\JsonContent(
     *             ref = "#/components/schemas/SolutionProposalData"
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
        $req_data
            = $request->getParsedBody()
            ?? json_decode($request->getBody(), true);
        $entity_manager = Utils::getEntityManager();

        $cuestion= (isset($req_data["cuestion"])) ? $entity_manager->find(Cuestion::class, $req_data["cuestion"]) : null;
        $user = (isset($req_data["user"])) ? $entity_manager->find(Usuario::class, $req_data["user"]) : null;


        if($cuestion === null || $user === null){ //La cuestion no existe
            return Error::error($this->container, $request, $response, StatusCode::HTTP_CONFLICT);
        }

        // 201
        $propuestaSolucion = new PropuestaSolucion(
            $req_data['textoPropuestaSolucion'],
            $req_data['propuestaSolucionCorrecta'] ?? false,
            $cuestion,
            $user,
            $req_data['corregida'] ?? false

        );
        $entity_manager->persist($propuestaSolucion);
        $entity_manager->flush();

        $this->logger->info(
            $request->getMethod() . ' ' . $request->getUri()->getPath(),
            [
                'uid' => $this->jwt->user_id,
                'status' => StatusCode::HTTP_CREATED
            ]
        );

        return $response->withJson($propuestaSolucion, StatusCode::HTTP_CREATED); // 201
    }

    /**
     * Summary: Updates a solution
     *
     * @OA\Put(
     *     path        = "/solutionsProposal/{solutionProposalId}",
     *     tags        = { "SolutionsProposal" },
     *     summary     = "Updates a solution Proposal",
     *     description = "Updates the solution Proposal identified by `solutionId`.",
     *     operationId = "tdw_put_solutionsProposal",
     *     @OA\Parameter(
     *          ref    = "#/components/parameters/solutionProposalId"
     *     ),
     *     @OA\RequestBody(
     *         description = "`SolutionProposal` data to update",
     *         required    = true,
     *         @OA\JsonContent(
     *             ref = "#/components/schemas/SolutionProposalData"
     *         )
     *     ),
     *     security    = {
     *          { "TDWApiSecurity": {} }
     *     },
     *     @OA\Response(
     *          response    = 209,
     *          description = "`Content Returned`: solution previously existed and is now updated",
     *          @OA\JsonContent(
     *              ref = "#/components/schemas/SolutionProposal"
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
        $propuestaSolucion = $entity_manager->find(PropuestaSolucion::class, $args['id']);

        if (null === $propuestaSolucion) {    // 404
            return Error::error($this->container, $request, $response, StatusCode::HTTP_NOT_FOUND);
        }
        if (isset($req_data['textoPropuestaSolucion'])) {///////
            $propuestaSolucion->setTextoPropuestaSolucion($req_data['textoPropuestaSolucion']);
        }
        if (isset($req_data['propuestaSolucionCorrecta'])) {
            $propuestaSolucion->setPropuestaSolucionCorrecta($req_data['propuestaSolucionCorrecta']);
        }

        if (isset($req_data['cuestion'])) {
            $cuestion = (isset($req_data["cuestion"])) ? $entity_manager->find(Cuestion::class, $req_data["cuestion"]) : null;
            if(null === $cuestion){ //cuestion no existe
                return Error::error($this->container, $request, $response, StatusCode::HTTP_CONFLICT);
            }
            $propuestaSolucion->setCuestion($cuestion);
        }

        if (isset($req_data['user'])) {
            $user = (isset($req_data["user"])) ? $entity_manager->find(Usuario::class, $req_data["user"]) : null;
            if(null === $user){ //usuario no existe
                return Error::error($this->container, $request, $response, StatusCode::HTTP_CONFLICT);
            }
            $propuestaSolucion->setUser($user);
        }

        if (isset($req_data['corregida'])) {
            $propuestaSolucion->setCorregida($req_data['corregida']);
        }


        //$entity_manager->merge($solucion);
        $entity_manager->flush();

        $this->logger->info(
            $request->getMethod() . ' ' . $request->getUri()->getPath(),
            [ 'uid' => $this->jwt->user_id, 'status' => StatusCode::HTTP_OK ]
        );

        return $response->withJson($propuestaSolucion)->withStatus(209, 'Content Returned');
    }
}
