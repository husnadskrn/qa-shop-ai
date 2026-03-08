@products
Feature: Products

  # Scenario: User sees product list
  #   Given I am logged in
  #   When I open the products page
  #   Then I should see the product list

  Scenario: User opens product detail
    Given I am logged in
    When I click on a product
    Then I should see product detail

  Scenario: Add product to cart
    Given I am logged in
    When I open product detail
    And I add product to cart
    Then product should appear in cart