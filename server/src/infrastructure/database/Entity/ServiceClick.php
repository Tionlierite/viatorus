<?php

namespace App\infrastructure\database\Entity;

use App\infrastructure\database\Repository\ServiceClickRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ServiceClickRepository::class)]
class ServiceClick
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $post_id = null;

    #[ORM\Column]
    private ?int $click_count = 0;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPostId(): ?int
    {
        return $this->post_id;
    }

    public function setPostId(int $post_id): static
    {
        $this->post_id = $post_id;

        return $this;
    }

    public function getClickCount(): ?int
    {
        return $this->click_count;
    }

    public function incrementClickCount(): self
    {
        $this->click_count++;
        return $this;
    }
}
