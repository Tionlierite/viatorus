<?php

namespace App\infrastructure\database\Entity;

use App\infrastructure\database\Repository\PartnersSalesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PartnersSalesRepository::class)]
class PartnersSales
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $brand_name = null;

    #[ORM\Column]
    private ?int $sales_count = 0;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBrandName(): ?string
    {
        return $this->brand_name;
    }

    public function setBrandName(string $brand_name): static
    {
        $this->brand_name = $brand_name;

        return $this;
    }

    public function getSalesCount(): ?int
    {
        return $this->sales_count;
    }

    public function incrementSalesCount(): self
    {
        $this->sales_count++;
        return $this;
    }
}
