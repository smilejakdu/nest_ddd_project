import { CoreResponse } from '../../../../shared/core/application/CoreResponse';
import { Affiliate } from '../../../domain/Affiliate';

export interface CreateAffiliateIndexesByFeatureResponse extends CoreResponse {
  partnersByDaySalesCost: Affiliate[];
  partnersByStandardCost: Affiliate[];
  jejuApi: Affiliate[];
}
