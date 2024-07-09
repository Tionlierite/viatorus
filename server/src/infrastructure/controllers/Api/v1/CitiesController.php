<?php

namespace App\infrastructure\controllers\Api\v1;

use App\infrastructure\database\Entity\Cities;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CitiesController extends AbstractController
{
    #[Route('/api/v1/cities', name: 'api_v1_cities', methods: ['GET'])]
    public function searchCities(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $searchTerm = $request->query->get('search');
        $countryId = $request->query->get('countryId');

        $queryBuilder = $entityManager->createQueryBuilder();
        $queryBuilder->select('city')
            ->from(Cities::class, 'city')
            ->where('city.name LIKE :searchTerm')
            ->andWhere('city.countries = :countryId')
            ->setParameter('searchTerm', '%' . $searchTerm . '%')
            ->setParameter('countryId', $countryId);

        $cities = $queryBuilder->getQuery()->getResult();

        $response = [];
        foreach ($cities as $city) {
            $response[] = [
                'id' => $city->getCityId(),
                'name' => $city->getName(),
            ];
        }

        return $this->json($response);
    }
}
