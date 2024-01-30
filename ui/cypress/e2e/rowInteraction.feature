Feature: Validation of Graph Slider and RPV

  Scenario: Validation of Graph Slider and RPV changes by clicking different rows

    Given I open the Oxidation State Analyser website

    When I enter "LiMn2O4" in Chemical composition text box and submit

    When I click row number 2

    Then I capture "current" RPV
    
    Then I capture "current" graph slider position

    When I click row number 3

    Then I capture "new" RPV

    Then I capture "new" graph slider position

    Then I verify the "RPV" and "Graph" changes