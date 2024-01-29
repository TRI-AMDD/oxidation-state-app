Feature: Validation of Graph Slider and LE

  Scenario: Validation of Graph Slider and LE changes by changing RPV values

    Given I open the Oxidation State Analyser website

    When I enter "LiMn2O4" in Chemical composition text box and submit

    Then I capture "current" graph slider position

    Then I capture "current" LE

    Then I enter new RPV "5.0000"

    Then I capture "new" graph slider position

    Then I capture "new" LE

    Then I verify the "LE" and "Graph" changes

    #Then the indicator should move