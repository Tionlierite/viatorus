<?php

namespace App\infrastructure\controllers\Api\v1;

use App\infrastructure\database\Entity\Countries;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CountriesController extends AbstractController
{
    #[Route('/api/v1/countries', name: 'api_v1_countries', methods: ['GET'])]
    public function searchCountries(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $searchTerm = $request->query->get('search');

        $queryBuilder = $entityManager->createQueryBuilder();
        $queryBuilder->select('country')
            ->from(Countries::class, 'country')
            ->where('country.name LIKE :searchTerm')
            ->setParameter('searchTerm', '%' . $searchTerm . '%');

        $countries = $queryBuilder->getQuery()->getResult();

        $response = [];
        foreach ($countries as $country) {
            $response[] = [
                'id' => $country->getCountryId(),
                'name' => $country->getName(),
            ];
        }

        return $this->json($response);
    }
}
