<?php

namespace App\infrastructure\controllers\Admin;

use App\infrastructure\database\Entity\Cities;
use App\infrastructure\database\Entity\Countries;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class CitiesCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Cities::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            AssociationField::new('countries')
                ->setFormTypeOptions([
                    'class' => Countries::class,
                    'choice_label' => 'name',
                ]),
            TextField::new('name')
        ];
    }
}
