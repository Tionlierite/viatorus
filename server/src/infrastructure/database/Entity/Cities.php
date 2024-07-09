<?php

namespace App\infrastructure\database\Entity;

use App\infrastructure\database\Repository\CitiesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CitiesRepository::class)]
class Cities
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $city_id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(targetEntity: VisitedPlaces::class, mappedBy: 'city')]
    private Collection $visited_places;

    #[ORM\ManyToOne(targetEntity: Countries::class)]
    #[ORM\JoinColumn(name: 'country_id', referencedColumnName: 'country_id')]
    private ?Countries $countries = null;

    public function __construct()
    {
        $this->visited_places = new ArrayCollection();
        $this->goals = new ArrayCollection();
    }
    public function getCityId(): ?int
    {
        return $this->city_id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

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

    public function getCountries(): ?Countries
    {
        return $this->countries;
    }

    public function setCountries(?Countries $countries): static
    {
        $this->countries = $countries;

        return $this;
    }
}
