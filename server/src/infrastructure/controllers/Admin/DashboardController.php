<?php

namespace App\infrastructure\controllers\Admin;

use App\infrastructure\database\Entity\Cities;
use App\infrastructure\database\Entity\Countries;
use App\infrastructure\database\Entity\Users;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        return $this->render('Admin/admin.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Admin Dashboard');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');
        yield MenuItem::section('Entities');
        yield MenuItem::linkToCrud('Countries', 'fas fa-globe', Countries::class);
        yield MenuItem::linkToCrud('Cities', 'fas fa-city', Cities::class);
        yield MenuItem::section('Users Management');
        yield MenuItem::linkToCrud('Users', 'fas fa-user', Users::class);
    }
}
