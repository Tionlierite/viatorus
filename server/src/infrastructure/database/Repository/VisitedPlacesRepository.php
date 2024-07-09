<?php

namespace App\infrastructure\database\Repository;

use App\infrastructure\database\Entity\VisitedPlaces;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<VisitedPlaces>
 */
class VisitedPlacesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, VisitedPlaces::class);
    }
}
