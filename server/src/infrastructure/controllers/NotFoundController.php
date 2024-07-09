<?php

namespace App\infrastructure\controllers;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class NotFoundController extends AbstractController
{
    public function notFound(): Response
    {
        return $this->json(['message' => 'Page not Found'], Response::HTTP_NOT_FOUND);
    }
}
