<?php

namespace App\infrastructure\database\Entity;

use App\infrastructure\database\Repository\CitiesRepository;
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

    #[ORM\ManyToOne(targetEntity: Countries::class)]
    #[ORM\JoinColumn(name: 'country_id', referencedColumnName: 'country_id')]
    private Countries|null $countries = null;

    public function getId(): ?int
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
