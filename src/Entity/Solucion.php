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
 * Class solucion
 *
 * @ORM\Entity()
 * @ORM\Table(
 *     name="soluciones",
 *     indexes={
 *         @ORM\Index(
 *             name="fk_cuestion_idx",
 *             columns={ "cuestion" }
 *         )
 *     }
 * )
 */
class Solucion implements \JsonSerializable
{
    /**
     * @var int $idSolucion
     *
     * @ORM\Id()
     * @ORM\GeneratedValue( strategy="AUTO" )
     * @ORM\Column(
     *     name="idSolucion",
     *     type="integer"
     * )
     */
    protected $idSolucion;

    /**
     * @var string|null $textoSolucion
     *
     * @ORM\Column(
     *     name="text_solucion",
     *     type="string",
     *     length=255,
     *     nullable=true
     * )
     */
    protected $textoSolucion;

    /**
     * @var bool $solucionCorrecta
     *
     * @ORM\Column(
     *     name="sol_correcta",
     *     type="boolean",
     *     options={ "default"=true }
     * )
     */
    protected $solucionCorrecta;

    /**
     * @var cuestion|null $cuestion
     *
     * @ORM\ManyToOne(
     *     targetEntity="Cuestion",
     *     inversedBy="soluciones"
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
     * @var ArrayCollection $razonamientos
     *
     * @ORM\OneToMany(
     *     targetEntity="Razonamiento",
     *     mappedBy="solucion",
     *     cascade={ "merge", "remove" },
     *     orphanRemoval=true
     * )
     */
    protected $razonamientos;

    public function __construct(
        ?string $textoSolucion = null,
        ?Cuestion $cuestion = null,
        bool $solucionCorrecta = true
    ) {
        $this->idSolucion = 0;
        $this->textoSolucion = $textoSolucion;
        $this->setCuestion($cuestion);
        $this->solucionCorrecta = $solucionCorrecta;
    }

    /**
     * @return int
     */
    public function getIdSolucion(): int
    {
        return $this->idSolucion;
    }

    /**
     * @return string|null
     */
    public function getTextoSolucion(): ?string
    {
        return $this->textoSolucion;
    }

    /**
     * @param string|null $textoSolucion
     * @return Solucion
     */
    public function setTextoSolucion(?string $textoSolucion): Solucion
    {
        $this->textoSolucion = $textoSolucion;
        return $this;
    }
    /**
     * @param bool $disponible
     * @return Cuestion
     */
    public function setSolucionCorrecta(bool $correcta): Solucion
    {
        $this->solucionCorrecta = $correcta;
        return $this;
    }
    /**
     * @return bool
     */
    public function isSolucionCorrecta(): bool
    {
        return $this->solucionCorrecta;
    }

    /**
     * @param bool $correcta
     * @return Solucion
     */
    public function setEnunciadoDisponible(bool $correcta): Solucion
    {
        $this->solucionCorrecta = $correcta;
        return $this;
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
    public function setCuestion(Cuestion $cuestion): Solucion
    {
        $this->cuestion = $cuestion;
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
        return '[ solucion ' .
            '(id=' . $this->getIdSolucion() . ', ' .
            'textoSolucion="' . $this->getTextoSolucion() . ', ' .
            'solucionCorrecta=' . (int) $this->isSolucionCorrecta() . ', ' .
            'cuestion=' . ($this->getCuestion()) . ', ' .
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
            'solucion'=> [
                'idSolucion' => $this->getIdSolucion(),
                'textoSolucion' => $this->getTextoSolucion(),
                'solucionCorrecta' => $this->isSolucionCorrecta(),
                'cuestion' => $this->getCuestion()->getIdCuestion(),
            ]
        ];
    }
}

/**
 * Solution definition
 *
 * @OA\Schema(
 *     schema = "Solution",
 *     type   = "object",
 *     required = { "idSolution"},
 *     @OA\Property(
 *          property    = "idSolucion",
 *          description = "Solution Id",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *      @OA\Property(
 *          property    = "textoSolucion",
 *          description = "Solution",
 *          type        = "string"
 *      ),
 *      @OA\Property(
 *          property    = "solucionCorrecta",
 *          description = "Denotes if question is correct",
 *          type        = "boolean"
 *      ),
 *      @OA\Property(
 *          property    = "cuestion",
 *          description = "Solution's id cuestion",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *      example = {
 *          "solution" = {
 *              "idSolucion"           = 805,
 *              "textoSolucion" = "Solution description",
 *              "solucionCorrecta"  = true,
 *              "cuestion"              = 1,
 *          }
 *     }
 * )
 */

/**
 * Solution data definition
 *
 * @OA\Schema(
 *      schema          = "SolutionData",
 *      @OA\Property(
 *          property    = "textoSolucion",
 *          description = "Solution",
 *          type        = "string"
 *      ),
 *      @OA\Property(
 *          property    = "solucionCorrecta",
 *          description = "Denotes if solution is correct",
 *          type        = "boolean"
 *      ),
 *      @OA\Property(
 *          property    = "cuestion",
 *          description = "Solution's id question",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *      example = {
 *          "textoSolucion" = "Solution description",
 *          "solucionCorrecta"  = true,
 *          "cuestion"              = 1
 *      }
 * )
 */

/**
 * Solution array definition
 *
 * @OA\Schema(
 *     schema           = "SolutionArray",
 *     @OA\Property(
 *          property    = "soluciones",
 *          description = "Solution array",
 *          type        = "array",
 *          @OA\Items(
 *              ref     = "#/components/schemas/Solution"
 *          )
 *     )
 * )
 */
