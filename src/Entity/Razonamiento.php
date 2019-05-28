<?php
/**
 * PHP version 7.2
 * src\Entity\Cuestion.php
 */

namespace TDW\GCuest\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use OpenApi\Annotations as OA;

/**
 * Class razonamiento
 *
 * @ORM\Entity()
 * @ORM\Table(
 *     name="razonamiento",
 *     indexes={
 *         @ORM\Index(
 *             name="fk_solucion_idx",
 *             columns={ "solucion" }
 *         )
 *     }
 * )
 */
class Razonamiento implements \JsonSerializable
{
    /**
     * @var int $idRazonamiento
     *
     * @ORM\Id()
     * @ORM\GeneratedValue( strategy="AUTO" )
     * @ORM\Column(
     *     name="idRazonamiento",
     *     type="integer"
     * )
     */
    protected $idRazonamiento;

    /**
     * @var string|null $textoRazonamiento
     *
     * @ORM\Column(
     *     name="text_razonamiento",
     *     type="string",
     *     length=255,
     *     nullable=true
     * )
     */
    protected $textoRazonamiento;

    /**
     * @var bool $razonamientoJustificado
     *
     * @ORM\Column(
     *     name="raz_justificado",
     *     type="boolean",
     *     options={ "default"=true }
     * )
     */
    protected $razonamientoJustificado;

    /**
     * @var solucion|null $cuestion
     *
     * @ORM\ManyToOne(
     *     targetEntity="Solucion",
     *     inversedBy="razonamientos"
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
     * @var string|null $textoError
     *
     * @ORM\Column(
     *     name="text_error",
     *     type="string",
     *     length=255,
     *     nullable=true
     * )
     */
    protected $textoError;

    public function __construct(
        ?string $textoRazonamiento = null,
        ?Solucion $solucion = null,
        bool $razonamientoJustificado = true,
        ?string $textoError = null
    ) {
        $this->idRazonamiento = 0;
        $this->textoRazonamiento = $textoRazonamiento;
        $this->setSolucion($solucion);
        $this->razonamientoJustificado = $razonamientoJustificado;
        $this->textoError = $textoError;
    }


    /**
     * @return int
     */
    public function getIdRazonamiento(): int
    {
        return $this->idRazonamiento;
    }

    /**
     * @return string|null
     */
    public function getTextoRazonamiento(): ?string
    {
        return $this->textoRazonamiento;
    }

    /**
     * @param string|null $textoSolucion
     * @return Solucion
     */
    public function setTextoRazonamiento(?string $textoRazonamiento): Razonamiento
    {
        $this->textoRazonamiento = $textoRazonamiento;
        return $this;
    }

    /**
     * @return bool
     */
    public function isRazonamientoJustificado(): bool
    {
        return $this->razonamientoJustificado;
    }

    /**
     * @param bool $correcta
     * @return Solucion
     */
    public function setRazonamientoJustificado(bool $justificado): Razonamiento
    {
        $this->razonamientoJustificado = $justificado;
        return $this;
    }

    /**
     * @return Solucion
     */
    public function getSolucion(): Solucion
    {
        return $this->solucion;
    }

    /**
     * @param Solucion $solucion
     * @return Razonamiento
     */
    public function setSolucion(Solucion $solucion): Razonamiento
    {
        $this->solucion = $solucion;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getTextoError(): ?string
    {
        return $this->textoError;
    }

    /**
     * @param string|null $textoError
     */
    public function setTextoError(?string $textoError): void
    {
        $this->textoError = $textoError;
    }

    /**
     * The __toString method allows a class to decide how it will react when it is converted to a string.
     *
     * @return string
     * @link http://php.net/manual/en/language.oop5.magic.php#language.oop5.magic.tostring
     */
    public function __toString()
    {
        return '[ solucion ' .
            '(id=' . $this->getIdRazonamiento() . ', ' .
            'textoSolucion="' . $this->getTextoRazonamiento() . ', ' .
            'solucionCorrecta=' . (int) $this->isRazonamientoJustificado() . ', ' .
            'textoError="' . $this->getTextoError() . ', ' .
            'solucion=' . ($this->getSolucion()) . ', ' .
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
            'razonamiento'=> [
                'idRazonamiento' => $this->getIdRazonamiento(),
                'textoRazonamiento' => $this->getTextoRazonamiento(),
                'razonamientoJustificado' => $this->isRazonamientoJustificado(),
                'textoError' => $this->getTextoError(),
                'solucion' => $this->getSolucion()->getIdSolucion()
            ]
        ];
    }
}

/**
 * Razonamiento definition
 *
 * @OA\Schema(
 *     schema = "Reason",
 *     type   = "object",
 *     required = { "idRazonamiento"},
 *     @OA\Property(
 *          property    = "idRazonamiento",
 *          description = "Razonamiento Id",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *      @OA\Property(
 *          property    = "textoRazonamiento",
 *          description = "Solution",
 *          type        = "string"
 *      ),
 *      @OA\Property(
 *          property    = "razonamientoJustificado",
 *          description = "Denotes if question is correct",
 *          type        = "boolean"
 *      ),
 *      @OA\Property(
 *          property    = "solucion",
 *          description = "Solution's id cuestion",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *      @OA\Property(
 *          property    = "textoError",
 *          description = "Error",
 *          type        = "string"
 *      ),
 *      example = {
 *          "razonamiento" = {
 *              "idRazonamiento"           = 805,
 *              "textoRazonamiento" = "Solution description",
 *              "razonamientoJustificado"  = true,
 *              "solucion"              = 1,
 *              "error"                 = "Error description"
 *          }
 *     }
 * )
 */

/**
 * Razonamiento data definition
 *
 * @OA\Schema(
 *      schema          = "ReasonData",
 *      @OA\Property(
 *          property    = "textoRazonamiento",
 *          description = "Solution",
 *          type        = "string"
 *      ),
 *      @OA\Property(
 *          property    = "razonamientoJustificacion",
 *          description = "Denotes if solution is correct",
 *          type        = "boolean"
 *      ),
 *      @OA\Property(
 *          property    = "solucion",
 *          description = "Solution's id question",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *      @OA\Property(
 *          property    = "textoError",
 *          description = "Error description",
 *          type        = "string"
 *      ),
 *      example = {
 *          "textoRazonamiento" = "Solution description",
 *          "razonamientoJustificacion"  = true,
 *          "solucion"              = 1,
 *          "error"                = "Error description"
 *      }
 * )
 */

/**
 * Razonamiento array definition
 *
 * @OA\Schema(
 *     schema           = "ReasonsArray",
 *     @OA\Property(
 *          property    = "razonamientos",
 *          description = "Razonamiento array",
 *          type        = "array",
 *          @OA\Items(
 *              ref     = "#/components/schemas/Reason"
 *          )
 *     )
 * )
 */
