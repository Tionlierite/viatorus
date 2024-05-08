<?php

namespace App\infrastructure\database\Entity;

use App\infrastructure\database\Repository\UsersRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity(repositoryClass: UsersRepository::class)]
class Users implements PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $user_id = null;

    #[ORM\Column(length: 255)]
    private ?string $username = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
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

    public function getUserId(): ?int
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

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getUserRoles(): ArrayCollection
    {
        return $this->user_roles;
    }

    public function setUserRoles(ArrayCollection $user_roles): static
    {
        $this->user_roles = $user_roles;

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
}
