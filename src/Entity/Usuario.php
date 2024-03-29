<?php
/**
 * PHP version 7.2
 * src\Entity\Usuario.php
 */

namespace TDW\GCuest\Entity;

use Composer\Package\Package;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use OpenApi\Annotations as OA;

/**
 * User
 *
 * @ORM\Entity()
 * @ORM\Table(
 *     name                 = "usuarios",
 *     uniqueConstraints    = {
 *          @ORM\UniqueConstraint(
 *              name="IDX_UNIQ_USER", columns={ "username" }
 *          ),
 *          @ORM\UniqueConstraint(
 *              name="IDX_UNIQ_EMAIL", columns={ "email" }
 *          )
 *      }
 *     )
 */
class Usuario implements \JsonSerializable
{
    /**
     * Id
     *
     * @var integer
     *
     * @ORM\Column(
     *     name     = "id",
     *     type     = "integer",
     *     nullable = false
     *     )
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @SuppressWarnings(PHPMD.ShortVariable)
     */
    private $id;

    /**
     * Username
     *
     * @var string
     *
     * @ORM\Column(
     *     name     = "username",
     *     type     = "string",
     *     length   = 32,
     *     nullable = false,
     *     unique   = true
     *     )
     */
    private $username;

    /**
     * Email
     *
     * @var string
     *
     * @ORM\Column(
     *     name     = "email",
     *     type     = "string",
     *     length   = 60,
     *     nullable = false,
     *     unique   = true
     *     )
     */
    private $email;

    /**
     * Password
     *
     * @var string
     *
     * @ORM\Column(
     *     name     = "password",
     *     type     = "string",
     *     length   = 60,
     *     nullable = false
     *     )
     */
    private $password;

    /**
     * Enabled
     *
     * @var boolean
     *
     * @ORM\Column(
     *     name     = "enabled",
     *     type     = "boolean",
     *     nullable = false
     *     )
     */
    private $enabled;

    /**
     * @var bool
     *
     * @ORM\Column(
     *     name="master",
     *     type="boolean",
     *     options={ "default" = false }
     * )
     */
    protected $isMaestro = false;

    /**
     * IsAdmin
     *
     * @var boolean
     *
     * @ORM\Column(
     *     name     = "admin",
     *     type     = "boolean",
     *     nullable = true,
     *     options  = { "default" = false }
     *     )
     */
    private $isAdmin;

    /**
     * @var ArrayCollection $cuestiones
     *
     * @ORM\OneToMany(
     *     targetEntity="Cuestion",
     *     mappedBy="creador",
     *     cascade={ "merge", "remove" },
     *     orphanRemoval=true
     * )
     */
    protected $cuestiones;


    /**
     * @var ArrayCollection $propuestaSoluciones
     *
     * @ORM\OneToMany(
     *     targetEntity="PropuestaSolucion",
     *     mappedBy="user",
     *     cascade={ "merge", "remove" },
     *     orphanRemoval=true
     * )
     */
    protected $propuestaSoluciones;

    /**
     * @var ArrayCollection $propuestaRazonamientos
     *
     * @ORM\OneToMany(
     *     targetEntity="PropuestaRazonamiento",
     *     mappedBy="user",
     *     cascade={ "merge", "remove" },
     *     orphanRemoval=true
     * )
     */
    protected $propuestaRazonamientos;

    /**
     * @var string|null $name
     *
     * @ORM\Column(
     *     name="name",
     *     type="string",
     *     length=255,
     *     nullable=true
     * )
     */

    protected $name;
    /**
     * @var string|null $surname
     *
     * @ORM\Column(
     *     name="surname",
     *     type="string",
     *     length=255,
     *     nullable=true
     * )
     */
    protected $surname;

    /**
     * @var string|null $phone_number
     *
     * @ORM\Column(
     *     name="phone_number",
     *     type="string",
     *     length=255,
     *     nullable=true
     * )
     */

    protected $phone_number;

    /**
     * User constructor.
     *
     * @param string $username phone_number
     * @param string $email email
     * @param string $password password
     * @param bool $enabled enabled
     * @param bool $isMaestro isMaestro
     * @param bool $isAdmin isAdmin
     * @param string $name
     * @param string $surname
     * @param string $phone_number
     */
    public function __construct(
        string $username = '',
        string $name = '',
        string $surname = '',
        string $phone_number = '',
        string $email = '',
        string $password = '',
        bool   $enabled = true,
        bool   $isMaestro = true,
        bool   $isAdmin = true
    ) {
        $this->id       = 0;
        $this->username = $username;
        $this->name = $name;
        $this->surname = $surname;
        $this->phone_number = $phone_number;
        $this->email    = $email;
        $this->setPassword($password);
        $this->enabled  = $enabled;
        $this->isMaestro = $isMaestro;
        $this->isAdmin  = $isAdmin;
        $this->cuestiones = new ArrayCollection();
        $this->propuestaSoluciones = new ArrayCollection();
        $this->propuestaRazonamientos = new ArrayCollection();
    }

    /**
     * Get id
     *
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * Get username
     *
     * @return string
     */
    public function getUsername(): string
    {
        return $this->username;
    }

    /**
     * Set username
     *
     * @param string $username username
     * @return Usuario
     */
    public function setUsername(string $username): Usuario
    {
        $this->username = $username;
        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * Set email
     *
     * @param string $email email
     * @return Usuario
     */
    public function setEmail(string $email): Usuario
    {
        $this->email = $email;
        return $this;
    }

    /**
     * Get isEnabled
     *
     * @return boolean
     */
    public function isEnabled(): bool
    {
        return $this->enabled;
    }

    /**
     * Set enabled
     *
     * @param boolean $enabled enabled
     * @return Usuario
     */
    public function setEnabled(bool $enabled): Usuario
    {
        $this->enabled = $enabled;
        return $this;
    }

    /**
     * Get isAdmin
     *
     * @return boolean
     */
    public function isAdmin(): bool
    {
        return $this->isAdmin;
    }

    /**
     * Set isAdmin
     *
     * @param boolean $isAdmin isAdmin
     * @return Usuario
     */
    public function setAdmin(bool $isAdmin): Usuario
    {
        $this->isAdmin = $isAdmin;
        return $this;
    }

    /**
     * @return bool
     */
    public function isMaestro(): bool
    {
        return $this->isMaestro;
    }

    /**
     * @param bool $esMaestro
     * @return Usuario
     */
    public function setMaestro(bool $esMaestro): Usuario
    {
        $this->isMaestro = $esMaestro;
        return $this;
    }

    /**
     * Get password hash
     *
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * Set password
     *
     * @param string $password password
     * @return Usuario
     */
    public function setPassword(string $password): Usuario
    {
        $this->password = (string) password_hash($password, PASSWORD_DEFAULT);
        return $this;
    }

    /**
     * Verifies that the given hash matches the user password.
     *
     * @param string $password password
     * @return boolean
     */
    public function validatePassword($password): bool
    {
        return password_verify($password, $this->password);
    }

    /**
     * @return Collection
     */
    public function getCuestiones(): Collection
    {
        return $this->cuestiones;
    }

    /**
     * Get an array with the questions identifiers
     *
     * @return array
     */
    private function getIdsCuestiones(): array
    {
        /** @var ArrayCollection $id_cuestiones */
        $id_cuestiones = $this->getCuestiones()->isEmpty()
            ? new ArrayCollection()
            : $this->getCuestiones()->map(
                function (Cuestion $cuestion) {
                    return $cuestion->getIdCuestion();
                }
            );

        return $id_cuestiones->getValues();
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
    public function containsPropuestaSolucion(PropuestaSolucion $propuestaSolucion): bool
    {
        return $this->propuestaSoluciones->contains($propuestaSolucion);
    }

    /**
     * Añade la propuesta solucion a la cuestión
     *
     * @param PropuestaSolucion $propuestaSolucion
     * @return Cuestion
     */
    public function addPropuestaSolucion(PropuestaSolucion $propuestaSolucion): PropuestaSolucion
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
    public function removePropuestaSolucion(PropuestaSolucion $propuestaSolucion): ?PropuestaSolucion
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
     * @return Collection
     */

    public function getPropuestaRazonamientos(): Collection
    {
        return $this->propuestaRazonamientos;
    }

    /**
     * @param PropuestaRazonamiento $propuestaRazonamientos
     * @return bool
     */
    public function containsPropuestaRazonamientos(PropuestaRazonamiento $propuestaRazonamientos): bool
    {
        return $this->propuestaRazonamientos->contains($propuestaRazonamientos);
    }


    /**
     * Añade la propuesta solucion a la cuestión
     *
     * @param PropuestaRazonamiento $propuestaRazonamiento
     * @return Cuestion
     */
    public function addPropuestaRazonamiento(PropuestaRazonamiento $propuestaRazonamiento): PropuestaRazonamiento
    {
        if ($this->propuestaRazonamientos->contains($propuestaRazonamiento)) {
            return $this;
        }

        $this->propuestaRazonamientos->add($propuestaRazonamiento);
        return $this;
    }

    /**
     * Elimina la solucion identificada por $solucion de la cuestión
     *
     * @param PropuestaRazonamiento $propuestaRazonamiento
     * @return PropuestaRazonamiento|null La cuestión o nulo, si la cuestión no contiene la propuesta solucion
     */
    public function removePropuestaRazonamiento(PropuestaRazonamiento $propuestaRazonamiento): ?PropuestaRazonamiento
    {
        if (!$this->propuestaRazonamientos->contains($propuestaRazonamiento)) {
            return null;
        }

        $this->propuestaRazonamientos->removeElement($propuestaRazonamiento);
        return $this;
    }

    /**
     * Get an array with the proposal solution identifiers
     *
     * @return array
     */
    private function getIdsPropuestaRazonamientos(): array
    {
        /** @var ArrayCollection $cod_soluciones */
        $cod_propuesta_Razonamientos = $this->getPropuestaRazonamientos()->isEmpty()
            ? new ArrayCollection()
            : $this->getPropuestaRazonamientos()->map(
                function (PropuestaRazonamiento $propuestaRazonamientos) {
                    return $propuestaRazonamientos->getIdPropuestaRazonamiento();
                }
            );

        return $cod_propuesta_Razonamientos->getValues();
    }

    /**
     * @return string|null
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * @param string|null $name
     */
    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string|null
     */
    public function getSurname(): ?string
    {
        return $this->surname;
    }

    /**
     * @param string|null $surname
     */
    public function setSurname(?string $surname): void
    {
        $this->surname = $surname;
    }

    /**
     * @return int|null
     */
    public function getPhoneNumber(): ?string
    {
        return $this->phone_number;
    }

    /**
     * @param int|null $phone_number
     */
    public function setPhoneNumber(string $phone_number): void
    {
        $this->phone_number = $phone_number;
    }

    /**
     * The __toString method allows a class to decide how it will react when it is converted to a string.
     *
     * @return string
     * @link http://php.net/manual/en/language.oop5.magic.php#language.oop5.magic.tostring
     */
    public function __toString(): string
    {
        $id_cuestiones = $this->getIdsCuestiones();
        $txt_cuestiones = '[ ' . implode(', ', $id_cuestiones) . ' ]';
        $cod_propuesta_soluciones = $this->getIdsPropuestaSoluciones();
        $txt_propuesta_soluciones = '[ ' . implode(', ', $cod_propuesta_soluciones) . ' ]';
        $cod_propuesta_razonamientos = $this->getIdsPropuestaRazonamientos();
        $txt_propuesta_razonamientos = '[ ' . implode(', ', $cod_propuesta_razonamientos) . ' ]';
        return '[ usuario ' .
            '(id=' . $this->getId() . ', ' .
            'username="' . $this->getUsername() . '", ' .
            'name="' . $this->getName() . '", ' .
            'surname="' . $this->getUsername() . '", ' .
            'PhoneNumer="' . $this->getPhoneNumber() . '", ' .
            'email="' . $this->getEmail() . '", ' .
            'password="' . $this->getPassword() . '", ' .
            'enabled="' . (int) $this->isEnabled() . '", ' .
            'isMaestro="' . (int) $this->isMaestro() . '", ' .
            'isAdmin="' . (int) $this->isAdmin() . '", ' .
            'cuestiones=' . $txt_cuestiones .
            'propuestaSoluciones=' . $txt_propuesta_soluciones .
            'propuestaRazonamientos=' . $txt_propuesta_razonamientos .
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
            'usuario' => [
                'id' => $this->getId(),
                'username' => $this->getUsername(),
                'name' => $this->getName(),
                'surname' => $this->getSurname(),
                'phoneNumber' => $this->getPhoneNumber(),
                'email' => $this->getEmail(),
                'password' => $this->getPassword(),
                'enabled' => $this->isEnabled(),
                'maestro' => $this->isMaestro(),
                'admin' => $this->isAdmin(),
                'cuestiones' => $this->getIdsCuestiones(),
                'propuestaSoluciones' => $this->getIdsPropuestaSoluciones(),
                'propuestaRazonamientos' => $this->getIdsPropuestaRazonamientos()
            ]
        ];
    }
}

/**
 * User definition
 *
 * @OA\Schema(
 *     schema = "User",
 *     type   = "object",
 *     required = { "id", "username", "email" },
 *     @OA\Property(
 *          property    = "id",
 *          description = "User Id",
 *          format      = "int64",
 *          type        = "integer"
 *      ),
 *      @OA\Property(
 *          property    = "username",
 *          description = "User name",
 *          type        = "string"
 *      ),
 *      @OA\Property(
 *          property    = "name",
 *          description = "User's name",
 *          type        = "string"
 *      ),
 *     @OA\Property(
 *          property    = "surname",
 *          description = "User's surname",
 *          type        = "string"
 *      ),
 *     @OA\Property(
 *          property    = "phone_number",
 *          description = "User's phone number",
 *          type        = "string"
 *      ),
 *      @OA\Property(
 *          property    = "email",
 *          description = "User email",
 *          type        = "string"
 *      ),
 *      @OA\Property(
 *          property    = "enabled",
 *          description = "Denotes if user is enabled",
 *          type        = "boolean"
 *      ),
 *      @OA\Property(
 *          property    = "isMaestro",
 *          description = "Denotes if user is Maestro",
 *          type        = "boolean"
 *      ),
 *      @OA\Property(
 *          property    = "isAdmin",
 *          description = "Denotes if user has admin privileges",
 *          type        = "boolean"
 *      ),
 *      example = {
 *          "usuario" = {
 *              "id"       = 1508,
 *              "username" = "User name",
 *              "name"     = "April",
 *              "surname"  = "Avery",
 *              "phoneNumber" = "666777888",
 *              "email"    = "User email",
 *              "enabled"  = true,
 *              "maestro"  = false,
 *              "admin"    = false
 *          }
 *     }
 * )
 */

/**
 * User data definition
 *
 * @OA\Schema(
 *      schema          = "UserData",
 *      @OA\Property(
 *          property    = "username",
 *          description = "User name",
 *          type        = "string"
 *      ),
 *      @OA\Property(
 *          property    = "email",
 *          description = "User email",
 *          type        = "string"
 *      ),
 *      @OA\Property(
 *          property    = "name",
 *          description = "User's name",
 *          type        = "string"
 *      ),
 *     @OA\Property(
 *          property    = "surname",
 *          description = "User's surname",
 *          type        = "string"
 *      ),
 *     @OA\Property(
 *          property    = "phone_number",
 *          description = "User's phone number",
 *          type        = "string"
 *      ),
 *      @OA\Property(
 *          property    = "password",
 *          description = "User password",
 *          type        = "string",
 *          format      = "password"
 *      ),
 *      @OA\Property(
 *          property    = "enabled",
 *          description = "Denotes if user is enabled",
 *          type        = "boolean"
 *      ),
 *      @OA\Property(
 *          property    = "isMaestro",
 *          description = "Denotes if user is Maestro",
 *          type        = "boolean"
 *      ),
 *      @OA\Property(
 *          property    = "isAdmin",
 *          description = "Denotes if user has admin privileges",
 *          type        = "boolean"
 *      ),
 *      example = {
 *          "username"  = "User_name",
 *          "name"     = "April",
 *          "surname"  = "Avery",
 *          "phoneNumber" = "666777888",
 *          "email"     = "User_email@example.com",
 *          "password"  = "User_password",
 *          "enabled"   = true,
 *          "isMaestro" = false,
 *          "isAdmin"   = false
 *      }
 * )
 */

/**
 * User array definition
 *
 * @OA\Schema(
 *     schema           = "UsersArray",
 *     @OA\Property(
 *          property    = "usuarios",
 *          description = "Users array",
 *          type        = "array",
 *          @OA\Items(
 *              ref     = "#/components/schemas/User"
 *          )
 *     )
 * )
 */
