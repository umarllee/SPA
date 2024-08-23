import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BadgeComponent } from './components/badge/badge.component';
import { DasFactsheetConfigComponent } from './components/das-factsheet-config/das-factsheet-config.component';
import { DataProfileComponent } from './components/data-profile/data-profile.component';
import { DataTopicComponent } from './components/data-topic/data-topic.component';
import { DataProfileDatatypeComponent } from './components/data-profile-datatype/data-profile-datatype.component';
import { DataProfilePatternComponent } from './components/data-profile-pattern/data-profile-pattern.component';
import { DataProfileStatisticsComponent } from './components/data-profile-statistics/data-profile-statistics.component';
import { DataProfileValuesComponent } from './components/data-profile-values/data-profile-values.component';
import { FactsheetDetailComponent } from './components/factsheet-detail/factsheet-detail.component';
import { FactsheetMasterComponent } from './components/factsheet-master/factsheet-master.component';
import { RcRlTemplateComponent } from './components/rc-rl-template/rc-rl-template.component';
import { ServiceLevelBadgeComponent } from './components/service-level-badge/service-level-badge.component';
import { ServiceLevelBadge1Component } from './components/service-level-badge1/service-level-badge1.component';
import { ServiceLevelMetricComponent } from './components/service-level-metric/service-level-metric.component';
import { ServiceLevelMetricMasterComponent } from './components/service-level-metric-master/service-level-metric-master.component';
import { ServiceLevelMetricsComponent } from './components/service-level-metrics/service-level-metrics.component';
import { RestrictionRuleMgmtComponent } from './components/restriction-rule-mgmt/restriction-rule-mgmt.component';
import { HolidaycalendarPmiComponent } from './components/holidaycalendar-pmi/holidaycalendar-pmi.component';
import { OperationalMetadataComponent } from './components/operational-metadata/operational-metadata.component';
import { MetadataAttributesComponent } from './components/metadata-attributes/metadata-attributes.component';
import { TargetMappingComponent } from './components/target-mapping/target-mapping.component';
import { LandingComponent } from './components/landing/landing.component';
import { BusinessObjDefinitionComponent } from './components/pages/business-obj-definition/business-obj-definition.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'business', component: BusinessObjDefinitionComponent },
  {
    path: 'main', component: DashboardComponent, children: [
      { path: 'badge', component: BadgeComponent },
      { path: 'das-factsheet-config', component: DasFactsheetConfigComponent },
      { path: 'data_profile_column', component: DataProfileComponent },
      { path: 'data_profile_datatype', component: DataProfileDatatypeComponent },
      { path: 'data_profile_pattern', component: DataProfilePatternComponent },
      { path: 'data_profile_statistics', component: DataProfileStatisticsComponent },
      { path: 'data_profile_values', component: DataProfileValuesComponent },
      { path: 'factsheet_detail', component: FactsheetDetailComponent },
      { path: 'factsheet_master', component: FactsheetMasterComponent },
      { path: 'rc_rl_template', component: RcRlTemplateComponent },
      { path: 'service_level_badge', component: ServiceLevelBadgeComponent },
      { path: 'service_level_badge1', component: ServiceLevelBadge1Component },
      { path: 'service_level_metric', component: ServiceLevelMetricComponent },
      { path: 'service_level_metric_master', component: ServiceLevelMetricMasterComponent },
      { path: 'service_level_metrics', component: ServiceLevelMetricsComponent },

      //CRUD
      { path: 'data-topic', component: DataTopicComponent },
      { path: 'restriction_rule_mgmt', component: RestrictionRuleMgmtComponent },
      { path: 'holidaycalendar_pmi', component: HolidaycalendarPmiComponent },
      { path: 'operational_metadata', component: OperationalMetadataComponent },
      { path: 'metadata_attributes', component: MetadataAttributesComponent },
      { path: 'target_mapping', component: TargetMappingComponent },
    ]
  },
  //RO

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
