<?php

namespace App\infrastructure\controllers\Admin;

use App\infrastructure\database\Entity\Roles;
use App\infrastructure\database\Entity\Users;

use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
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
            AssociationField::new('user_roles')
                ->setFormTypeOptions([
                    'class' => Roles::class,
                    'choice_label' => 'name',
                    'multiple' => true,
                    'expanded' => true,
                ])
                ->formatValue(function ($value, $entity) {
                    return implode(', ', $entity->getUserRoles()->map(function ($role) {
                        return $role->getName();
                    })->toArray());
                }),
        ];
    }
}
