import {Component, Input, OnInit} from '@angular/core';
import {FeatureToggle} from '../../../../../services/auth.service';

@Component({
  selector: 'app-feature-toggle',
  templateUrl: './feature-toggle.component.html',
  styleUrls: ['./feature-toggle.component.css']
})
export class FeatureToggleComponent implements OnInit {

  constructor() { }
  @Input() featureToggle: FeatureToggle;

  ngOnInit() {
  }

}
