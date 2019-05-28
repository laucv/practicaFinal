<?php


namespace TDW\GCuest\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use OpenApi\Annotations as OA;
use TDW\GCuest\Entity\Solucion;

/**
 * Class PropuestaRazonamiento
 *
 * @ORM\Entity()
 * @ORM\Table(
 *     name="propuestaRazonamiento",
 *     indexes={
 *         @ORM\Index(
 *             name="fk_solucion_idx",
 *             columns={ "solucion" }
 *         )
 *     }
 * )
 */
class PropuestaRazonamiento implements \JsonSerializable
{
    /**
     * @var int $idPropuestaRazonamiento
     *
     * @ORM\Id()
     * @ORM\GeneratedValue( strategy="AUTO" )
     * @ORM\Column(
     *     name="idPropuestaRazonamiento",
     *     type="integer"
     * )
     */
    protected $idPropuestaRazonamiento;

    /**
     * @var string|null $textoPropuestaRazonamiento
     *
     * @ORM\Column(
     *     name="text_propuesta_Razonamiento",
     *     type="string",
     *     length=255,
     *     nullable=true
     * )
     */
    protected $textoPropuestaRazonamiento;

    /**
     * @var bool $propuestaRazonamientoJustificado
     *
     * @ORM\Column(
     *     name="propuesta_razonamiento_justificado",
     *     type="boolean",
     *     options={ "default"=true }
     * )
     */
    protected $propuestaRazonamientoJustificado;

    /**
     * @var solucion|null $solucion
     *
     * @ORM\ManyToOne(
     *     targetEntity="Solucion",
     *     inversedBy="propuestaRazonamientos"
     *     )
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(
     *     name="solucion",
     *     referencedColumnName="idSolucion",
     *     nullable=true,
     *     onDelete="SET NULL"
     *     )
     * })
     */
    protected $solucion;

    /**
     * @var Usuario|null $user
     *
     * @ORM\ManyToOne(
     *     targetEntity="Usuario",
     *     inversedBy="propuestaRazonamientos"
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
     * @var bool $corregida
     *
     * @ORM\Column(
     *     name="corregida",
     *     type="boolean",
     *     options={ "default"=false }
     * )
     */
    protected $corregida;

    /**
     * Cuestion constructor.
     *
     * @param string|null $textoPropuestaRazonamiento
     * @param bool $propuestaRazonamientoJustificado
     * @param Solucion|null $solucion
     * @param Usuario|null $user
     * @param bool $corregida
     *
     * @throws \Doctrine\ORM\ORMException
     */

    public function __construct(
        string $textoPropuestaRazonamiento = null,
        bool $propuestaRazonamientoJustificado = true,
        ?Solucion $solucion = null,
        ?Usuario $user = null,
        bool $corregida = true

    )
    {
        $this->idPropuestaRazonamiento = 0;
        $this->textoPropuestaRazonamiento = $textoPropuestaRazonamiento;
        $this->propuestaRazonamientoJustificado = $propuestaRazonamientoJustificado;
        $this->setSolucion($solucion);
        $this->setUser($user);
        $this->corregida = $corregida;

    }

    /**
     * @return int
     */
    public function getIdPropuestaRazonamiento(): int
    {
        return $this->idPropuestaRazonamiento;
    }

    /**
     * @return string|null
     */
    public function getTextoPropuestaRazonamiento(): ?string
    {
        return $this->textoPropuestaRazonamiento;
    }

    /**
     * @param string|null $textoPropuestaRazonamiento
     * @return PropuestaRazonamiento
     */
    public function setTextoPropuestaRazonamiento(?string $textoPropuestaRazonamiento): PropuestaRazonamiento
    {
        $this->textoPropuestaRazonamiento = $textoPropuestaRazonamiento;
        return $this;
    }

    /**
     * @param bool $propuestaJustificado
     * @return Cuestion
     */
    public function setPropuestaRazonamientoJustificado(bool $propuestaJustificado): PropuestaRazonamiento
    {
        $this->propuestaRazonamientoJustificado = $propuestaJustificado;
        return $this;
    }

    /**
     * @return bool
     */
    public function isPropuestaRazonamientoJustificado(): bool
    {
        return $this->propuestaRazonamientoJustificado;
    }

    /**
     * @return Cuestion
     */
    public function getSolucion(): Solucion
    {
        return $this->solucion;
    }

    /**
     * @param Solucion $solucion
     * @return PropuestaRazonamiento
     */
    public function setSolucion(Solucion $solucion): PropuestaRazonamiento
    {
        $this->solucion = $solucion;
        return $this;
    }

    public function getUser(): ?Usuario
    {
        return $this->user;
    }

    /**
     * @param Usuario|null $creador
     * @return Cuestion
     * @throws \Doctrine\ORM\ORMException
     */
    public function setUser(?Usuario $user): PropuestaRazonamiento
    {
        $this->user = $user;
        return $this;
    }
    /**
     * @return bool
     */
    public
    function isCorregida(): bool
    {
        return $this->corregida;
    }

    /**
     * @param bool $corregida
     */
    public
    function setCorregida(bool $corregida): void
    {
        $this->corregida = $corregida;
    }
    /**
     * The __toString method allows a class to decide how it will react when it is converted to a string.
     *
     * @return string
     * @link http://php.net/manual/en/language.oop5.magic.php#language.oop5.magic.tostring
     */
    public function __toString()
    {
        return '[ propuestaRazonamiento ' .
            '(idPropuestaRazonamiento=' . $this->getIdPropuestaRazonamiento() . ', ' .
            'textoPropuestaRazonamiento="' . $this->getTextoPropuestaRazonamiento() . ', ' .
            'propuestaRazonamientoJustificado=' . (int)$this->isPropuestaRazonamientoJustificado() . ', ' .
            'solucion=' . ($this->getsolucion()) . ', ' .
            'user=' . ($this->getUser() ?? 0). ', ' .
            'corregida=' . (int)$this->isCorregida() . ', ' .
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
            'propuestaRazonamiento'=> [
                'idPropuestaRazonamiento' => $this->getIdPropuestaRazonamiento(),
                'textoPropuestaRazonamiento' => $this->getTextoPropuestaRazonamiento(),
                'propuestaRazonamientoJustificado' => $this->isPropuestaRazonamientoJustificado(),
                'solucion' => $this->getSolucion()->getIdSolucion(),
                'user' => $this->getUser() ? $this->getUser()->getId() : null,
                'corregida' => $this->isCorregida()
            ]
        ];
    }
}

/**
 * Proposal Reason definition
 *
 * @OA\Schema(
 *     schema = "ReasonProposal",
 *     type   = "object",
 *     required = { "idReasonProposal"},
 *     @OA\Property(
 *          property    = "idPropuestaRazonamiento",
 *          description = "Solution Id",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *      @OA\Property(
 *          property    = "textoPropuestaRazonamiento",
 *          description = "Razonamiento",
 *          type        = "string"
 *      ),
 *      @OA\Property(
 *          property    = "propuestaRazonamientoJustificado",
 *          description = "Denotes if reason is correct",
 *          type        = "boolean"
 *      ),
 *      @OA\Property(
 *          property    = "solucion",
 *          description = "Reason's id solution",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *      @OA\Property(
 *          property    = "user",
 *          description = "Reason's id user creator",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *      @OA\Property(
 *          property    = "corregida",
 *          description = "Denotes if question is checked by the teacher",
 *          type        = "boolean"
 *      ),
 *      example = {
 *          "propuestaRazonamiento" = {
 *              "idPropuestaRazonamiento"           = 805,
 *              "textoPropuestaRazonamiento" = "Razonamiento description",
 *              "propuestaRazonamientoJustificado"  = false,
 *              "solucion"              = 1,
 *              "user"              = 1,
 *              "corregida" = false
 *          }
 *     }
 * )
 */

/**
 * Reason Proposal data definition
 *
 * @OA\Schema(
 *      schema          = "ReasonProposalData",
 *      @OA\Property(
 *          property    = "textoPropuestaRazonamiento",
 *          description = "Razonamiento",
 *          type        = "string"
 *      ),
 *      @OA\Property(
 *          property    = "propuestaRazonamientoJustificado",
 *          description = "Denotes if reason is justified",
 *          type        = "boolean"
 *      ),
 *      @OA\Property(
 *          property    = "solucion",
 *          description = "Reason's id question",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *      @OA\Property(
 *          property    = "user",
 *          description = "Solucion's id creator",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *     @OA\Property(
 *          property    = "corregida",
 *          description = "Denotes if question is checked by the teacher",
 *          type        = "boolean"
 *      ),
 *      example = {
 *          "textoPropuestaRazonamiento" = "Razonamiento description",
 *          "propuestaRazonamientoJustificado"  = false,
 *          "solucion"              = 1,
 *          "user"              = 1,
 *          "corregida" = false
 *      }
 * )
 */

/**
 * Solution Proposal array definition
 *
 * @OA\Schema(
 *     schema           = "ReasonProposalArray",
 *     @OA\Property(
 *          property    = "propuestaRazonamientos",
 *          description = "PropuestaReason array",
 *          type        = "array",
 *          @OA\Items(
 *              ref     = "#/components/schemas/ReasonProposal"
 *          )
 *     )
 * )
 */
