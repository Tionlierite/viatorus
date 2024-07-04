<?php

namespace App\infrastructure\controllers\Api\v1;

use App\infrastructure\database\Entity\Cities;
use App\infrastructure\database\Entity\Users;
use App\infrastructure\database\Entity\VisitedPlaces;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class VisitedPlacesController extends AbstractController
{
    #[Route('/api/v1/visited-places', name: 'api_v1_visited_places', methods: ['POST'])]
    public function addVisitedPlace(Request $request, JWTTokenManagerInterface $jwtManager, EntityManagerInterface $entityManager): JsonResponse
    {
        $token = $request->headers->get('Authorization');
        if (!$token) {
            return $this->json(['message' => 'Missing token'], Response::HTTP_UNAUTHORIZED);
        }

        $token = str_replace('Bearer ', '', $token);
        try {
            $jwtPayload = $jwtManager->parse($token);
        } catch (JWTDecodeFailureException $e) {
            return $this->json(['message' => 'Invalid token'], Response::HTTP_UNAUTHORIZED);
        }

        $userId = $jwtPayload['user_id'];
        $cityId = $request->request->get('city_id');
        $visitedAt = $request->request->get('visited_at');
        if (!$cityId || !$visitedAt) {
            return $this->json(['message' => 'Missing required parameters'], Response::HTTP_BAD_REQUEST);
        }

        $user = $entityManager->getRepository(Users::class)->find($userId);
        $city = $entityManager->getRepository(Cities::class)->find($cityId);
        if (!$user || !$city) {
            return $this->json(['message' => 'User or city not found'], Response::HTTP_NOT_FOUND);
        }

        $visitedPlace = new VisitedPlaces();
        $visitedPlace->setUser($user);
        $visitedPlace->setCity($city);
        $visitedPlace->setVisitedAt($visitedAt);

        $entityManager->persist($visitedPlace);
        $entityManager->flush();

        return $this->json(['message' => 'Visited place added successfully'], Response::HTTP_CREATED);
    }
}
