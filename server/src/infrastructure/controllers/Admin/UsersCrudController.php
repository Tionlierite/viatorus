<?php

namespace App\infrastructure\controllers\Admin;

use App\infrastructure\database\Entity\Roles;
use App\infrastructure\database\Entity\Users;

use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class UsersCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Users::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('username'),
            TextField::new('email'),
            TextField::new('password'),
            AssociationField::new('user_roles')
                ->setFormTypeOptions([
                    'class' => Roles::class,
                    'choice_label' => 'name',
                    'multiple' => true,
                    'expanded' => true,
                ]),
        ];
    }
}
