<?php

namespace App\infrastructure\controllers\Api\v1;

use App\infrastructure\database\Entity\ServiceClick;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ServiceClickController extends AbstractController
{
    #[Route('/api/v1/service-click', name: 'api_v1_post_click', methods: ['POST'])]
    public function index(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        $postId = $data['post_id'] ?? null;

        if (!$postId) {
            return $this->json(['message' => 'Missing postId parameter'], Response::HTTP_BAD_REQUEST);
        }

        $serviceClick = $entityManager->getRepository(ServiceClick::class)->findOneBy(['post_id' => $postId]);

        if (!$serviceClick) {
            $serviceClick = new ServiceClick();
            $serviceClick->setPostId($postId);
        }

        $serviceClick->incrementClickCount();

        $entityManager->persist($serviceClick);
        $entityManager->flush();

        return $this->json(['message' => 'Post click recorded successfully'], Response::HTTP_OK);
    }
}
