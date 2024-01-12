Feature: Validation of Graph Slider and RPV

  Scenario: Validation of Graph Slider and RPV changes by clicking different rows

    Given I open the Oxidation State Analyser website

    When I enter "LiMn2O4" in Chemical composition text box

    When I click Submit

    When I click row number 2

    Then I capture "current" RPV and graph slider position

    When I click row number 3

    Then I capture "new" RPV and graph slider position

    Then I validate the changes in RPV and graph slider position