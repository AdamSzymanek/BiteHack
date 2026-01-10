package com.example.webshop.services;


public class CategoryService {
    @PersistenceContext
    EntityManager entityManager;

    public CategoryService() {
    }

    public Category getCategoryById(UUID id) {
        List<Category> categories = entityManager.createQuery("select c from Categories c where c.id=:id", Category.class)
                .setParameter("id", id)
                .getResultList();

        if (categories.isEmpty()) {
            return null;
        }

        return categories.getFirst();
    }

    public boolean categoryExists(String name) {
        List<Category> categories = entityManager.createQuery("select c from Categories c where c.name=:name", Category.class)
                .setParameter("name",name)
                .getResultList();

        return !categories.isEmpty();
    }

    @Transactional
    public void createCategory(String name) {
        if (categoryExists(name)) {
            return;
        }

        Category category = new Category(name);
        entityManager.persist(category);
    }
}
