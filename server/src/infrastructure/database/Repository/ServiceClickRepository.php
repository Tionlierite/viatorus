<?php

namespace App\infrastructure\database\Repository;

use App\infrastructure\database\Entity\ServiceClick;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ServiceClick>
 */
class ServiceClickRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ServiceClick::class);
    }
}
