<?php

namespace App\infrastructure\database\Entity;

use App\infrastructure\database\Repository\VisitedPlacesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VisitedPlacesRepository::class)]
class VisitedPlaces
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Users::class, inversedBy: 'visitedPlaces')]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'user_id')]
    private ?Users $user;

    #[ORM\ManyToOne(targetEntity: Cities::class, inversedBy: 'visitedPlaces')]
    #[ORM\JoinColumn(name: 'city_id', referencedColumnName: 'city_id')]
    private ?Cities $city;

    #[ORM\Column]
    private ?int $visitedAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?Users
    {
        return $this->user;
    }

    public function setUser(?Users $user): static
    {
        $this->user = $user;
        return $this;
    }

    public function getCity(): ?Cities
    {
        return $this->city;
    }

    public function setCity(?Cities $city): static
    {
        $this->city = $city;
        return $this;
    }

    public function getVisitedAt(): ?int
    {
        return $this->visitedAt;
    }

    public function setVisitedAt(int $visitedAt): static
    {
        $this->visitedAt = $visitedAt;

        return $this;
    }
}
