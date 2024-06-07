<?php

namespace App\infrastructure\database\Entity;

use App\infrastructure\database\Repository\UsersRepository;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UlidType;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Uid\Ulid;

#[ORM\Entity(repositoryClass: UsersRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
class Users implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\Column(type: UlidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.ulid_generator')]
    private ?Ulid $user_id = null;

    #[ORM\Column(length: 255)]
    private ?string $username = null;

    #[ORM\Column(length: 180)]
    private ?string $email = null;

    #[ORM\Column]
    private ?string $password = null;

    #[ORM\JoinTable(name: 'users_roles')]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'user_id')]
    #[ORM\InverseJoinColumn(name: 'role_id', referencedColumnName: 'role_id')]
    #[ORM\ManyToMany(targetEntity: Roles::class)]
    private Collection $user_roles;

    #[ORM\JoinTable(name: 'visited_places')]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'user_id')]
    #[ORM\InverseJoinColumn(name: 'city_id', referencedColumnName: 'city_id')]
    #[ORM\ManyToMany(targetEntity: Cities::class)]
    private Collection $visited_places;

    #[ORM\JoinTable(name: 'goals')]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'user_id')]
    #[ORM\InverseJoinColumn(name: 'city_id', referencedColumnName: 'city_id')]
    #[ORM\ManyToMany(targetEntity: Cities::class)]
    private Collection $goals;

    public function __construct()
    {
        $this->user_roles = new ArrayCollection();
        $this->visited_places = new ArrayCollection();
        $this->goals = new ArrayCollection();
    }

    public function getUserId(): ?Ulid
    {
        return $this->user_id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getUserRoles(): Collection
    {
        return $this->user_roles;
    }
    public function getRoles(): array
    {
        $roles = $this->getUserRoles()->map(function($role) {
            return $role->getName();
        })->toArray();

        $roles[] = 'ROLE_USER';

        return $roles;
    }

    public function setUserRoles(Roles $user_role): static
    {
        if (!$this->user_roles->contains($user_role)) {
            $this->user_roles->add($user_role);
        }

        return $this;
    }

    public function getVisitedPlaces(): ArrayCollection
    {
        return $this->visited_places;
    }

    public function setVisitedPlaces(ArrayCollection $visited_places): static
    {
        $this->visited_places = $visited_places;

        return $this;
    }

    public function getGoals(): ArrayCollection
    {
        return $this->goals;
    }

    public function setGoals(ArrayCollection $goals): static
    {
        $this->goals = $goals;

        return $this;
    }

    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }
}
