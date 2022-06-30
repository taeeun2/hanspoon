package com.hansol.hanspoon.service;

import com.hansol.hanspoon.entity.Category;
import com.hansol.hanspoon.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public List<Category> getCategoryList() {
        List<Category> resVal = categoryRepository.findAll();
        resVal.add(0, new Category(0,"전체"));
        return resVal;
    }
}
