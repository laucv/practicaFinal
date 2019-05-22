<?php


namespace TDW\GCuest\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use OpenApi\Annotations as OA;
use TDW\GCuest\Controller\PropuestaSolucionController;

/**
 * Class PropuestaSolucion
 *
 * @ORM\Entity()
 * @ORM\Table(
 *     name="propuestaSoluciones",
 *     indexes={
 *         @ORM\Index(
 *             name="fk_cuestion_idx",
 *             columns={ "cuestion" }
 *         )
 *     }
 * )
 */
class PropuestaSolucion
{
    /**
     * @var int $idPropuestaSolucion
     *
     * @ORM\Id()
     * @ORM\GeneratedValue( strategy="AUTO" )
     * @ORM\Column(
     *     name="idPropuestaSolucion",
     *     type="integer"
     * )
     */
    protected $idPropuestaSolucion;

    /**
     * @var string|null $textoPropuestaSolucion
     *
     * @ORM\Column(
     *     name="text_propuesta_solucion",
     *     type="string",
     *     length=255,
     *     nullable=true
     * )
     */
    protected $textoPropuestaSolucion;

    /**
     * @var bool $propuestaSolucionCorrecta
     *
     * @ORM\Column(
     *     name="propuesta_solucion_correcta",
     *     type="boolean",
     *     options={ "default"=true }
     * )
     */
    protected $propuestaSolucionCorrecta;

    /**
     * @var cuestion|null $cuestion
     *
     * @ORM\ManyToOne(
     *     targetEntity="Cuestion",
     *     inversedBy="propuestaSoluciones"
     *     )
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(
     *     name="cuestion",
     *     referencedColumnName="idCuestion",
     *     nullable=true,
     *     onDelete="SET NULL"
     *     )
     * })
     */
    protected $cuestion;

    /**
     * @var Usuario|null $user
     *
     * @ORM\ManyToOne(
     *     targetEntity="Usuario",
     *     inversedBy="propuestaSoluciones"
     *     )
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(
     *     name="user",
     *     referencedColumnName="id",
     *     nullable=true,
     *     onDelete="SET NULL"
     *     )
     * })
     */
    protected $user;

    /**
     * Cuestion constructor.
     *
     * @param string|null $textoPropuestaSolucion
     * @param bool $propuestaSolucionCorrecta
     * @param Cuestion|null $cuestion
     * @param Usuario|null $user
     *
     * @throws \Doctrine\ORM\ORMException
     */

    public function __construct(
        ?string $textoPropuestaSolucion = null,
        bool $propuestaSolucionCorrecta = true,
        ?Cuestion $cuestion = null,
        ?Usuario $user = null
    )
    {
        $this->idPropuestaSolucion = 0;
        $this->textoPropuestaSolucion = $textoPropuestaSolucion;
        $this->propuestaSolucionCorrecta = $propuestaSolucionCorrecta;
        $this->setCuestion($cuestion);
        $this->setUser($user);
    }

    /**
     * @return int
     */
    public function getIdPropuestaSolucion(): int
    {
        return $this->idPropuestaSolucion;
    }

    /**
     * @return string|null
     */
    public function getTextoPropuestaSolucion(): ?string
    {
        return $this->textoPropuestaSolucion;
    }

    /**
     * @param string|null $textoSolucion
     * @return Solucion
     */
    public function setTextoPropuestaSolucion(?string $textoPropuestaSolucion): PropuestaSolucion
    {
        $this->textoPropuestaSolucion = $textoPropuestaSolucion;
        return $this;
    }

    /**
     * @param bool $disponible
     * @return Cuestion
     */
    public function setPropuestaSolucionCorrecta(bool $correcta): PropuestaSolucion
    {
        $this->PropuestaSolucionCorrecta = $correcta;
        return $this;
    }

    /**
     * @return bool
     */
    public function isPropuestaSolucionCorrecta(): bool
    {
        return $this->propuestaSolucionCorrecta;
    }

    /**
     * @return Cuestion
     */
    public function getCuestion(): Cuestion
    {
        return $this->cuestion;
    }

    /**
     * @param Cuestion $cuestion
     * @return Solucion
     */
    public function setCuestion(Cuestion $cuestion): PropuestaSolucion
    {
        $this->cuestion = $cuestion;
        return $this;
    }

    public function getUser(): ?Usuario
    {
        return $this->creador;
    }

    /**
     * @param Usuario|null $creador
     * @return Cuestion
     * @throws \Doctrine\ORM\ORMException
     */
    public function setUser(?Usuario $creador): PropuestaSolucion
    {
        $this->creador = $creador;
        return $this;
    }

    /**
     * The __toString method allows a class to decide how it will react when it is converted to a string.
     *
     * @return string
     * @link http://php.net/manual/en/language.oop5.magic.php#language.oop5.magic.tostring
     */
    public function __toString()
    {
        return '[ propuestaSolucion ' .
            '(idPropuestaSolucion=' . $this->getIdPropuestaSolucion() . ', ' .
            'textoPropuestaSolucion="' . $this->getTextoPropuestaSolucion() . ', ' .
            'propuestaSolucionCorrecta=' . (int)$this->isPropuestaSolucionCorrecta() . ', ' .
            'cuestion=' . ($this->getCuestion()) . ', ' .
            'user=' . ($this->getUser() ?? 0) . ', ' .
            ') ]';
    }

    /**
     * Specify data which should be serialized to JSON
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4.0
     */
    public function jsonSerialize()
    {
        return [
            'propuestaSolucion' => [
                'idPropuestaSolucion' => $this->getIdPropuestaSolucion(),
                'textoPropuestaSolucion' => $this->getTextoPropuestaSolucion(),
                'cuestion' => $this->getCuestion()->getIdCuestion(),
                'propuestaSolucionCorrecta' => $this->getIdPropuestaSolucion(),
                'user' => $this->getUser() ? $this->getUser()->getId() : null,
            ]
        ];
    }
}

/**
 * Proposal Solution definition
 *
 * @OA\Schema(
 *     schema = "SolutionProposal",
 *     type   = "object",
 *     required = { "idProposalSolution"},
 *     @OA\Property(
 *          property    = "idPropuestaSolucion",
 *          description = "Solution Id",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *      @OA\Property(
 *          property    = "textoPropuestaSolucion",
 *          description = "Solution",
 *          type        = "string"
 *      ),
 *      @OA\Property(
 *          property    = "propuestaSolucionCorrecta",
 *          description = "Denotes if question is correct",
 *          type        = "boolean"
 *      ),
 *      @OA\Property(
 *          property    = "cuestion",
 *          description = "Solution's id cuestion",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *      @OA\Property(
 *          property    = "user",
 *          description = "Solution's id user creator",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *      example = {
 *          "solution" = {
 *              "idSolucion"           = 805,
 *              "textoSolucion" = "Solution description",
 *              "solucionCorrecta"  = true,
 *              "cuestion"              = 50,
 *              "user"              = 1
 *          }
 *     }
 * )
 */

/**
 * Solution Proposal data definition
 *
 * @OA\Schema(
 *      schema          = "SolutionProposalData",
 *      @OA\Property(
 *          property    = "textoPropuestaSolucion",
 *          description = "Solution",
 *          type        = "string"
 *      ),
 *      @OA\Property(
 *          property    = "propuestaSolucionCorrecta",
 *          description = "Denotes if solution is correct",
 *          type        = "boolean"
 *      ),
 *      @OA\Property(
 *          property    = "cuestion",
 *          description = "Solution's id question",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *      @OA\Property(
 *          property    = "user",
 *          description = "Solution's id creator",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *      example = {
 *          "textoPropuestaSolucion" = "Solution description",
 *          "propuestaSolucionCorrecta"  = false,
 *          "cuestion"              = 50,
 *          "user"              = 1
 *      }
 * )
 */

/**
 * Solution Proposal array definition
 *
 * @OA\Schema(
 *     schema           = "SolutionProposalArray",
 *     @OA\Property(
 *          property    = "propuestaSoluciones",
 *          description = "PropuestaSolution array",
 *          type        = "array",
 *          @OA\Items(
 *              ref     = "#/components/schemas/SolutionProposal"
 *          )
 *     )
 * )
 */
