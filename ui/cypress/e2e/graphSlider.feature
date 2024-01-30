Feature: Validation of RPV and LE

  Scenario: Validation of RPV and LE changes by moving Oxi States

    Given I open the Oxidation State Analyser website

    When I enter "LiMn2O4" in Chemical composition text box and submit

    Then I capture "current" RPV

    Then I capture "current" LE

    Then I click on new toggle value

    Then I capture "new" RPV

    Then I capture "new" LE

    Then I verify the "RPV" and "LE" changes

    #Then the indicator should move