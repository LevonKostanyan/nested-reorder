import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

interface Rule {
  type: string;
  condition: string;
  field?: string;
  operator?: string;
  value?: string;
  rules?: Rule[];
}

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DirectiveComponent {

  data: Record<any, any | any[]> = {
    type: 'Ruleset',
    condition: 'and',
    rules: [
      {
        type: 'Rule',
        condition: 'or',
        field: 'field 1',
        operator: 'op 1',
        value: 'val 1',
      },
      {
        type: 'Ruleset',
        condition: 'or',
        rules: [
          {
            type: 'Rule',
            condition: 'and',
            field: 'smt 3',
            operator: 'smt 3',
            value: 'smt 3',
          },
          {
            type: 'Ruleset',
            condition: 'and',
            rules: [
              {
                type: 'Rule',
                condition: 'and',
                field: 'smt 5',
                operator: 'smt 5',
                value: 'smt 5',
              },
              {
                type: 'Rule',
                condition: 'or',
                field: 'smt 7',
                operator: 'smt 7',
                value: 'smt 7',
              },
            ],
          },
        ],
      },
      {
        type: 'Rule',
        condition: 'or',
        field: 'field 2',
        operator: 'op 2',
        value: 'val 2',
      },
    ],
  };
  public candidateSortablePosition: 'top' | 'bottom' | null = null;
  public candidateNewRuleset: any = null;
  private candidateOldRuleset: any = null;
  public candidateSortableRuleIndex: any = null;
  private candidateRuleIndex: any = null

  onDragEnd() {
    setTimeout(() => {
      if (this.candidateNewRuleset) {
        const newElement = {...this.candidateOldRuleset.rules[this.candidateRuleIndex]}
        const originalElement = this.candidateOldRuleset.rules[this.candidateRuleIndex]
        if (this.candidateSortablePosition === 'top') {
          this.candidateNewRuleset.rules.splice(this.candidateSortableRuleIndex, 0, newElement)
        } else {
          this.candidateNewRuleset.rules.splice(this.candidateSortableRuleIndex + 1, 0, newElement)
        }
        this.candidateOldRuleset.rules = this.candidateOldRuleset.rules.filter((rule: Rule) => rule !== originalElement);

      }
      this.candidateSortablePosition = null;
      this.candidateSortableRuleIndex = null;
      this.candidateRuleIndex = null;
      this.candidateOldRuleset = null;
      this.candidateNewRuleset = null;
    }, 300)
  }

  onDragStart(ruleset: any, ruleIndex: any) {
    this.candidateOldRuleset = ruleset
    this.candidateRuleIndex = ruleIndex;
  }

  setCandidateRuleset(ruleset: any) {
    this.candidateNewRuleset = ruleset;
  }

  setCandidateSortableRule(rulesetIndex: any, event: MouseEvent) {
    this.candidateSortableRuleIndex = rulesetIndex;
    this.getHoverPosition(event);
  }

  getHoverPosition(event: MouseEvent) {
    const rect = (event.target as HTMLDivElement).getBoundingClientRect();
    const mouseY = event.clientY;
    const middleY = rect.top + (rect.height / 2);
    if (mouseY < middleY) {
      this.candidateSortablePosition = 'top';
    } else {
      this.candidateSortablePosition = 'bottom';
    }
  }
}
