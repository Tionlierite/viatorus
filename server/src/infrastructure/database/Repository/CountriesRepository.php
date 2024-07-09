<?php

namespace App\infrastructure\database\Repository;

use App\infrastructure\database\Entity\Countries;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Countries>
 */
class CountriesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Countries::class);
    }
}
