<?php

namespace App\infrastructure\controllers\Api\v1;

use App\infrastructure\database\Entity\PartnersSales;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PartnersSalesController extends AbstractController
{
    #[Route('/api/v1/partner-sale', name: 'api_v1_partner_sale', methods: ['POST'])]
    public function index(Request $request, EntityManagerInterface $entityManager): Response
    {
        $partner_name = $request->request->get('partner_name');

        if (!$partner_name) {
            return $this->json(['message' => 'Missing brand_name parameter'], Response::HTTP_BAD_REQUEST);
        }

        $partnerSale = $entityManager->getRepository(PartnersSales::class)->findOneBy(['partner_name' => $partner_name]);

        if (!$partnerSale) {
            $partnerSale = new $partnerSale();
            $partnerSale->setBrandName($partnerSale);
        }

        $partnerSale->incrementSalesCount();

        $entityManager->persist($partnerSale);
        $entityManager->flush();

        return $this->json(['message' => 'Partner sale recorded successfully'], Response::HTTP_OK);
    }
}
