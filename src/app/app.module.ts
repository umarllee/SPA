import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BadgeComponent } from './components/badge/badge.component';
import { DasFactsheetConfigComponent } from './components/das-factsheet-config/das-factsheet-config.component';
import { DataProfileComponent } from './components/data-profile/data-profile.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DataTopicComponent } from './components/data-topic/data-topic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { TargetMappingComponent } from './components/target-mapping/target-mapping.component';
import { MetadataAttributesComponent } from './components/metadata-attributes/metadata-attributes.component';
import { LandingComponent } from './components/landing/landing.component';


@NgModule({
  declarations: [
    AppComponent,
    BadgeComponent,
    DasFactsheetConfigComponent,
    DataProfileComponent,
    DashboardComponent,
    DataTopicComponent,
    DataProfileDatatypeComponent,
    DataProfilePatternComponent,
    DataProfileStatisticsComponent,
    DataProfileValuesComponent,
    FactsheetDetailComponent,
    FactsheetMasterComponent,
    RcRlTemplateComponent,
    ServiceLevelBadgeComponent,
    ServiceLevelBadge1Component,
    ServiceLevelMetricComponent,
    ServiceLevelMetricMasterComponent,
    ServiceLevelMetricsComponent,
    RestrictionRuleMgmtComponent,
    HolidaycalendarPmiComponent,
    OperationalMetadataComponent,
    TargetMappingComponent,
    MetadataAttributesComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
