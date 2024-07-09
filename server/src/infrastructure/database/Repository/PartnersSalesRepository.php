<?php

namespace App\infrastructure\database\Repository;

use App\infrastructure\database\Entity\PartnersSales;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PartnersSales>
 */
class PartnersSalesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PartnersSales::class);
    }
}
