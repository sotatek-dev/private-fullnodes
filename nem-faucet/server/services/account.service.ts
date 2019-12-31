import {
  Account,
  AccountHttp,
  MosaicHttp,
  TransactionType,
  MosaicId,
  UInt64,
  TransferTransaction,
  MosaicAmountView,
} from 'nem2-sdk'
import { of } from 'rxjs'
import { map, mergeMap, filter, catchError, toArray } from 'rxjs/operators'

export class AccountService {
  private apiUrl: string
  private accountHttp: AccountHttp

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
    this.accountHttp = new AccountHttp(apiUrl)
  }

  getAccountInfoWithMosaicAmountView(account: Account, mosaicId: MosaicId) {
    return this.accountHttp.getAccountInfo(account.address).pipe(
      mergeMap(accountInfo => {
        let amount: UInt64 = new UInt64([0, 0])
        for (let i = 0; i < accountInfo.mosaics.length; i++) {
          const mosaic = accountInfo.mosaics[i]
          if (mosaic.id.equals(mosaicId)) {
            amount = mosaic.amount
            break
          }
        }
        return new MosaicHttp(this.apiUrl).getMosaic(mosaicId).pipe(
          map(mosaicInfo => {
            const mosaicAmountView = new MosaicAmountView(mosaicInfo, amount)
            return ({ account, mosaicAmountView })
          })
        )
      }),
      catchError(error => {
        console.error({ error })
        return of({ account, mosaicAmountView: null })
      })
    )
  }

  getTransferOutgoings(accountFrom: Account, recipient: Account, height: UInt64, wait = 10) {
    return this.accountHttp
      .getAccountOutgoingTransactions(accountFrom.address)
      .pipe(
        mergeMap(_ => _),
        filter(tx => tx.type === TransactionType.TRANSFER),
        map(_ => _ as TransferTransaction),
        filter(tx => tx.recipientAddress.equals(recipient.address)),
// @ts-ignore WIP
        filter(tx => tx.transactionInfo.height.compact() > height.compact() - wait),
        toArray(),
        catchError(error => {
          console.error({ error })
          return of([])
        })
      )
  }

  getTransferUnconfirmed(accountFrom: Account, recipient: Account) {
    return this.accountHttp
      .getAccountUnconfirmedTransactions(accountFrom.address)
      .pipe(
        mergeMap(_ => _),
        filter(tx => tx.type === TransactionType.TRANSFER),
        map(_ => _ as TransferTransaction),
        filter(tx => tx.recipientAddress.equals(recipient.address)),
        toArray(),
        catchError(error => {
          console.error({ error })
          return of([])
        })
      )
  }
}

export default AccountService
