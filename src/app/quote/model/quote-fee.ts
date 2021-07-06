import { SaleFee } from './sale-fee';
import { InternetFee } from './internet-fee';
import { FreightFee } from './freight-fee';
import { CraneFee } from './crane-fee';
import { CustomFee } from './custom-fee';
import { FixedFee } from './fixed-fee';

export class QuoteFee {

  public exchangeRate: number;
  public quotePrice: number;
  public estimatedTotalForeignCost: number;
  public estimatedTotalLocalCost: number;
  public estimatedTotalCost: number;
  public saleFee: SaleFee;
  public internetFee: InternetFee;
  public freightFee: FreightFee;
  public foreignCraneFee: CraneFee;
  public localCraneFee: CraneFee;
  public customFee: CustomFee;
  public foreignFixedFees: FixedFee[];
  public localFixedFees: FixedFee[];

}
