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
 * Class Cuestion
 *
 * @ORM\Entity()
 * @ORM\Table(
 *     name="cuestiones",
 *     indexes={
 *         @ORM\Index(
 *             name="fk_creador_idx",
 *             columns={ "creador" }
 *         )
 *     }
 * )
 */
class Cuestion implements \JsonSerializable
{

    /**
     * @var int $idCuestion
     *
     * @ORM\Id()
     * @ORM\GeneratedValue( strategy="AUTO" )
     * @ORM\Column(
     *     name="idCuestion",
     *     type="integer"
     * )
     */
    protected $idCuestion;

    /**
     * @var string|null $enunciadoDescripcion
     *
     * @ORM\Column(
     *     name="enum_descripcion",
     *     type="string",
     *     length=255,
     *     nullable=true
     * )
     */
    protected $enunciadoDescripcion;

    /**
     * @var bool $enunciadoDisponible
     *
     * @ORM\Column(
     *     name="enum_disponible",
     *     type="boolean",
     *     options={ "default"=false }
     * )
     */
    protected $enunciadoDisponible;

    /**
     * @var Usuario|null $creador
     *
     * @ORM\ManyToOne(
     *     targetEntity="Usuario",
     *     inversedBy="cuestiones"
     *     )
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(
     *     name="creador",
     *     referencedColumnName="id",
     *     nullable=true,
     *     onDelete="SET NULL"
     *     )
     * })
     */
    protected $creador;


    /**
     * @var ArrayCollection $soluciones
     *
     * @ORM\OneToMany(
     *     targetEntity="Solucion",
     *     mappedBy="cuestion",
     *     cascade={ "merge", "remove" },
     *     orphanRemoval=true
     * )
     */
    protected $soluciones;

    /**
     * @var ArrayCollection $propuestaSoluciones
     *
     * @ORM\OneToMany(
     *     targetEntity="PropuestaSolucion",
     *     mappedBy="cuestion",
     *     cascade={ "merge", "remove" },
     *     orphanRemoval=true
     * )
     */
    protected $propuestaSoluciones;

    /**
     * Cuestion constructor.
     *
     * @param string|null  $enunciadoDescripcion
     * @param Usuario|null $creador
     * @param bool         $enunciadoDisponible
     *
     * @throws \Doctrine\ORM\ORMException
     */
    public function __construct(
        ?string $enunciadoDescripcion = null,
        ?Usuario $creador = null,
        bool $enunciadoDisponible = false
    ) {
        $this->idCuestion = 0;
        $this->enunciadoDescripcion = $enunciadoDescripcion;
        (null !== $creador)
            ? $this->setCreador($creador)
            : null;
        $this->enunciadoDisponible = $enunciadoDisponible;
        $this->soluciones = new ArrayCollection();
        $this->propuestaSoluciones = new ArrayCollection();

    }

    /**
     * @return int
     */
    public function getIdCuestion(): int
    {
        return $this->idCuestion;
    }

    /**
     * @return string|null
     */
    public function getEnunciadoDescripcion(): ?string
    {
        return $this->enunciadoDescripcion;
    }

    /**
     * @param string|null $enunciadoDescripcion
     * @return Cuestion
     */
    public function setEnunciadoDescripcion(?string $enunciadoDescripcion): Cuestion
    {
        $this->enunciadoDescripcion = $enunciadoDescripcion;
        return $this;
    }

    /**
     * @return bool
     */
    public function isEnunciadoDisponible(): bool
    {
        return $this->enunciadoDisponible;
    }

    /**
     * @param bool $disponible
     * @return Cuestion
     */
    public function setEnunciadoDisponible(bool $disponible): Cuestion
    {
        $this->enunciadoDisponible = $disponible;
        return $this;
    }

    /**
     * @return Usuario|null
     */
    public function getCreador(): ?Usuario
    {
        return $this->creador;
    }

    /**
     * @param Usuario|null $creador
     * @return Cuestion
     * @throws \Doctrine\ORM\ORMException
     */
    public function setCreador(?Usuario $creador): Cuestion
    {
        if ($creador && !$creador->isMaestro()) {
            throw new \Doctrine\ORM\ORMException('Creador debe ser maestro');
        }
        $this->creador = $creador;
        return $this;
    }

    /**
     * @return Collection
     */

    public function getSoluciones(): Collection
    {
        return $this->soluciones;
    }

    /**
     * @param Solucion $solucion
     * @return bool
     */
    public function containsSolucion(Solucion $solucion): bool
    {
        return $this->soluciones->contains($solucion);
    }

    /**
     * Añade la solucion a la cuestión
     *
     * @param Solucion $solucion
     * @return Cuestion
     */
    public function addSolucion(Solucion $solucion): Cuestion
    {
        if ($this->soluciones->contains($solucion)) {
            return $this;
        }

        $this->soluciones->add($solucion);
        return $this;
    }

    /**
     * Elimina la solucion identificada por $solucion de la cuestión
     *
     * @param Solucion $solucion
     * @return Solucion|null La cuestión o nulo, si la cuestión no contiene la solucion
     */
    public function removeSolucion(Solucion $solucion): ?Cuestion
    {
        if (!$this->soluciones->contains($solucion)) {
            return null;
        }

        $this->soluciones->removeElement($solucion);
        return $this;
    }

    /**
     * Get an array with the solution identifiers
     *
     * @return array
     */
    private function getIdsSoluciones(): array
    {
        /** @var ArrayCollection $cod_soluciones */
        $cod_soluciones = $this->getSoluciones()->isEmpty()
            ? new ArrayCollection()
            : $this->getSoluciones()->map(
                function (Solucion $solucion) {
                    return $solucion->getIdSolucion();
                }
            );

        return $cod_soluciones->getValues();
    }

    /**
     * @return Collection
     */

    public function getPropuestaSoluciones(): Collection
    {
        return $this->propuestaSoluciones;
    }

    /**
     * @param PropuestaSolucion $propuestaSolucion
     * @return bool
     */
    public function containsPropuesstaSolucion(PropuestaSolucion $propuestaSolucion): bool
    {
        return $this->propuestaSoluciones->contains($propuestaSolucion);
    }

    /**
     * Añade la propuesta solucion a la cuestión
     *
     * @param PropuestaSolucion $propuestaSolucion
     * @return Cuestion
     */
    public function addPropuestaSolucion(PropuestaSolucion $propuestaSolucion): Cuestion
    {
        if ($this->propuestaSoluciones->contains($propuestaSolucion)) {
            return $this;
        }

        $this->propuestaSoluciones->add($propuestaSolucion);
        return $this;
    }

    /**
     * Elimina la solucion identificada por $solucion de la cuestión
     *
     * @param PropuestaSolucion $propuestaSolucion
     * @return PropuestaSolucion|null La cuestión o nulo, si la cuestión no contiene la propuesta solucion
     */
    public function removePropuestaSolucion(PropuestaSolucion $propuestaSolucion): ?Cuestion
    {
        if (!$this->propuestaSoluciones->contains($propuestaSolucion)) {
            return null;
        }

        $this->propuestaSoluciones->removeElement($propuestaSolucion);
        return $this;
    }

    /**
     * Get an array with the proposal solution identifiers
     *
     * @return array
     */
    private function getIdsPropuestaSoluciones(): array
    {
        /** @var ArrayCollection $cod_soluciones */
        $cod_propuesta_soluciones = $this->getPropuestaSoluciones()->isEmpty()
            ? new ArrayCollection()
            : $this->getPropuestaSoluciones()->map(
                function (PropuestaSolucion $propuestaSolucion) {
                    return $propuestaSolucion->getIdPropuestaSolucion();
                }
            );

        return $cod_propuesta_soluciones->getValues();
    }

    /**
     * The __toString method allows a class to decide how it will react when it is converted to a string.
     *
     * @return string
     * @link http://php.net/manual/en/language.oop5.magic.php#language.oop5.magic.tostring
     */
    public function __toString()
    {

        $cod_soluciones = $this->getIdsSoluciones();
        $txt_soluciones = '[ ' . implode(', ', $cod_soluciones) . ' ]';
        $cod_propuesta_soluciones = $this->getIdsPropuestaSoluciones();
        $txt_propuesta_soluciones = '[ ' . implode(', ', $cod_propuesta_soluciones) . ' ]';
        return '[ cuestion ' .
            '(id=' . $this->getIdCuestion() . ', ' .
            'enunciadoDescripcion="' . $this->getEnunciadoDescripcion() . '", ' .
            'enunciadoDisponible=' . (int) $this->isEnunciadoDisponible() . ', ' .
            'creador=' . ($this->getCreador() ?? 0) . ', ' .
            'soluciones=' . $txt_soluciones .
            'propuestaSoluciones=' . $txt_propuesta_soluciones .
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
            'cuestion' => [
                'idCuestion' => $this->getIdCuestion(),
                'enunciadoDescripcion' => $this->getEnunciadoDescripcion(),
                'enunciadoDisponible' => $this->isEnunciadoDisponible(),
                'creador' => $this->getCreador() ? $this->getCreador()->getId() : null,
                'soluciones' => $this->getIdsSoluciones(),
                'propuestaSoluciones' => $this->getIdsPropuestaSoluciones()
            ]
        ];
    }
}

/**
 * Question definition
 *
 * @OA\Schema(
 *     schema = "Question",
 *     type   = "object",
 *     required = { "idCuestion" },
 *     @OA\Property(
 *          property    = "idCuestion",
 *          description = "Question Id",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *      @OA\Property(
 *          property    = "enunciadoDescripcion",
 *          description = "Question description",
 *          type        = "string"
 *      ),
 *      @OA\Property(
 *          property    = "enunciadoDisponible",
 *          description = "Denotes if question is available",
 *          type        = "boolean"
 *      ),
 *      @OA\Property(
 *          property    = "creador",
 *          description = "Question's id creator",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *      example = {
 *          "cuestion" = {
 *              "idCuestion"           = 805,
 *              "enunciadoDescripcion" = "Question description",
 *              "enunciadoDisponible"  = true,
 *              "creador"              = 7
 *          }
 *     }
 * )
 */

/**
 * Question data definition
 *
 * @OA\Schema(
 *      schema          = "QuestionData",
 *      @OA\Property(
 *          property    = "enunciadoDescripcion",
 *          description = "Question description",
 *          type        = "string"
 *      ),
 *      @OA\Property(
 *          property    = "enunciadoDisponible",
 *          description = "Denotes if question is available",
 *          type        = "boolean"
 *      ),
 *      @OA\Property(
 *          property    = "creador",
 *          description = "Question's id creator",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *      example = {
 *          "enunciadoDescripcion" = "Question description",
 *          "enunciadoDisponible"  = true,
 *          "creador"              = 501
 *      }
 * )
 */

/**
 * Question array definition
 *
 * @OA\Schema(
 *     schema           = "QuestionsArray",
 *     @OA\Property(
 *          property    = "cuestiones",
 *          description = "Questions array",
 *          type        = "array",
 *          @OA\Items(
 *              ref     = "#/components/schemas/Question"
 *          )
 *     )
 * )
 */
