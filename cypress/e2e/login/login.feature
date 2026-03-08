@login
Feature: Login

  Scenario: Successful login
    Given I open the login page
    When I log in with valid credentials
    Then I should be redirected to the products page

  Scenario: Invalid login
    Given I open the login page
    When I log in with invalid credentials
    Then I should see the login error message

  Scenario: Empty email
    Given I open the login page
    When I try to login without email
    Then I should see email required error

  Scenario: Empty password
    Given I open the login page
    When I try to login without password
    Then I should see password required error

  Scenario: Empty form
    Given I open the login page
    When I try to login with empty form
    Then I should see validation errors 