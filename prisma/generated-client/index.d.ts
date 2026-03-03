
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Firm
 * 
 */
export type Firm = $Result.DefaultSelection<Prisma.$FirmPayload>
/**
 * Model Invitation
 * 
 */
export type Invitation = $Result.DefaultSelection<Prisma.$InvitationPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model TeamMember
 * 
 */
export type TeamMember = $Result.DefaultSelection<Prisma.$TeamMemberPayload>
/**
 * Model AssetFile
 * 
 */
export type AssetFile = $Result.DefaultSelection<Prisma.$AssetFilePayload>
/**
 * Model Deal
 * 
 */
export type Deal = $Result.DefaultSelection<Prisma.$DealPayload>
/**
 * Model ActivityLog
 * 
 */
export type ActivityLog = $Result.DefaultSelection<Prisma.$ActivityLogPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  FIRM_ADMIN: 'FIRM_ADMIN',
  USER: 'USER',
  SYSTEM_ADMIN: 'SYSTEM_ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const AssetType: {
  INDUSTRIAL: 'INDUSTRIAL',
  RETAIL: 'RETAIL',
  MULTIFAMILY: 'MULTIFAMILY',
  SF: 'SF',
  OFFICE: 'OFFICE',
  HOTEL: 'HOTEL',
  HOSPITALITY: 'HOSPITALITY',
  MIXED_USE: 'MIXED_USE',
  LAND: 'LAND'
};

export type AssetType = (typeof AssetType)[keyof typeof AssetType]


export const Strategy: {
  BUY_AND_HOLD: 'BUY_AND_HOLD',
  FIX_FLIP: 'FIX_FLIP',
  VALUE_ADD: 'VALUE_ADD',
  CORE: 'CORE',
  STABILIZED: 'STABILIZED',
  OPPORTUNISTIC: 'OPPORTUNISTIC'
};

export type Strategy = (typeof Strategy)[keyof typeof Strategy]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type AssetType = $Enums.AssetType

export const AssetType: typeof $Enums.AssetType

export type Strategy = $Enums.Strategy

export const Strategy: typeof $Enums.Strategy

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Firms
 * const firms = await prisma.firm.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Firms
   * const firms = await prisma.firm.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.firm`: Exposes CRUD operations for the **Firm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Firms
    * const firms = await prisma.firm.findMany()
    * ```
    */
  get firm(): Prisma.FirmDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invitation`: Exposes CRUD operations for the **Invitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invitations
    * const invitations = await prisma.invitation.findMany()
    * ```
    */
  get invitation(): Prisma.InvitationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teamMember`: Exposes CRUD operations for the **TeamMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeamMembers
    * const teamMembers = await prisma.teamMember.findMany()
    * ```
    */
  get teamMember(): Prisma.TeamMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assetFile`: Exposes CRUD operations for the **AssetFile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AssetFiles
    * const assetFiles = await prisma.assetFile.findMany()
    * ```
    */
  get assetFile(): Prisma.AssetFileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.deal`: Exposes CRUD operations for the **Deal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Deals
    * const deals = await prisma.deal.findMany()
    * ```
    */
  get deal(): Prisma.DealDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activityLog`: Exposes CRUD operations for the **ActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityLogs
    * const activityLogs = await prisma.activityLog.findMany()
    * ```
    */
  get activityLog(): Prisma.ActivityLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.1
   * Query Engine version: 55ae170b1ced7fc6ed07a15f110549408c501bb3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Firm: 'Firm',
    Invitation: 'Invitation',
    User: 'User',
    TeamMember: 'TeamMember',
    AssetFile: 'AssetFile',
    Deal: 'Deal',
    ActivityLog: 'ActivityLog',
    Task: 'Task'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "firm" | "invitation" | "user" | "teamMember" | "assetFile" | "deal" | "activityLog" | "task"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Firm: {
        payload: Prisma.$FirmPayload<ExtArgs>
        fields: Prisma.FirmFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FirmFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FirmFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload>
          }
          findFirst: {
            args: Prisma.FirmFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FirmFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload>
          }
          findMany: {
            args: Prisma.FirmFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload>[]
          }
          create: {
            args: Prisma.FirmCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload>
          }
          createMany: {
            args: Prisma.FirmCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FirmCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload>[]
          }
          delete: {
            args: Prisma.FirmDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload>
          }
          update: {
            args: Prisma.FirmUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload>
          }
          deleteMany: {
            args: Prisma.FirmDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FirmUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FirmUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload>[]
          }
          upsert: {
            args: Prisma.FirmUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload>
          }
          aggregate: {
            args: Prisma.FirmAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFirm>
          }
          groupBy: {
            args: Prisma.FirmGroupByArgs<ExtArgs>
            result: $Utils.Optional<FirmGroupByOutputType>[]
          }
          count: {
            args: Prisma.FirmCountArgs<ExtArgs>
            result: $Utils.Optional<FirmCountAggregateOutputType> | number
          }
        }
      }
      Invitation: {
        payload: Prisma.$InvitationPayload<ExtArgs>
        fields: Prisma.InvitationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvitationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvitationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          findFirst: {
            args: Prisma.InvitationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvitationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          findMany: {
            args: Prisma.InvitationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>[]
          }
          create: {
            args: Prisma.InvitationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          createMany: {
            args: Prisma.InvitationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvitationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>[]
          }
          delete: {
            args: Prisma.InvitationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          update: {
            args: Prisma.InvitationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          deleteMany: {
            args: Prisma.InvitationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvitationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvitationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>[]
          }
          upsert: {
            args: Prisma.InvitationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          aggregate: {
            args: Prisma.InvitationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvitation>
          }
          groupBy: {
            args: Prisma.InvitationGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvitationGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvitationCountArgs<ExtArgs>
            result: $Utils.Optional<InvitationCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      TeamMember: {
        payload: Prisma.$TeamMemberPayload<ExtArgs>
        fields: Prisma.TeamMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          findFirst: {
            args: Prisma.TeamMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          findMany: {
            args: Prisma.TeamMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>[]
          }
          create: {
            args: Prisma.TeamMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          createMany: {
            args: Prisma.TeamMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>[]
          }
          delete: {
            args: Prisma.TeamMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          update: {
            args: Prisma.TeamMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          deleteMany: {
            args: Prisma.TeamMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeamMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>[]
          }
          upsert: {
            args: Prisma.TeamMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          aggregate: {
            args: Prisma.TeamMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeamMember>
          }
          groupBy: {
            args: Prisma.TeamMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamMemberCountArgs<ExtArgs>
            result: $Utils.Optional<TeamMemberCountAggregateOutputType> | number
          }
        }
      }
      AssetFile: {
        payload: Prisma.$AssetFilePayload<ExtArgs>
        fields: Prisma.AssetFileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssetFileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetFilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssetFileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetFilePayload>
          }
          findFirst: {
            args: Prisma.AssetFileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetFilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssetFileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetFilePayload>
          }
          findMany: {
            args: Prisma.AssetFileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetFilePayload>[]
          }
          create: {
            args: Prisma.AssetFileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetFilePayload>
          }
          createMany: {
            args: Prisma.AssetFileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssetFileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetFilePayload>[]
          }
          delete: {
            args: Prisma.AssetFileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetFilePayload>
          }
          update: {
            args: Prisma.AssetFileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetFilePayload>
          }
          deleteMany: {
            args: Prisma.AssetFileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssetFileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssetFileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetFilePayload>[]
          }
          upsert: {
            args: Prisma.AssetFileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetFilePayload>
          }
          aggregate: {
            args: Prisma.AssetFileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssetFile>
          }
          groupBy: {
            args: Prisma.AssetFileGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssetFileGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssetFileCountArgs<ExtArgs>
            result: $Utils.Optional<AssetFileCountAggregateOutputType> | number
          }
        }
      }
      Deal: {
        payload: Prisma.$DealPayload<ExtArgs>
        fields: Prisma.DealFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DealFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DealFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          findFirst: {
            args: Prisma.DealFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DealFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          findMany: {
            args: Prisma.DealFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>[]
          }
          create: {
            args: Prisma.DealCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          createMany: {
            args: Prisma.DealCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DealCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>[]
          }
          delete: {
            args: Prisma.DealDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          update: {
            args: Prisma.DealUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          deleteMany: {
            args: Prisma.DealDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DealUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DealUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>[]
          }
          upsert: {
            args: Prisma.DealUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          aggregate: {
            args: Prisma.DealAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeal>
          }
          groupBy: {
            args: Prisma.DealGroupByArgs<ExtArgs>
            result: $Utils.Optional<DealGroupByOutputType>[]
          }
          count: {
            args: Prisma.DealCountArgs<ExtArgs>
            result: $Utils.Optional<DealCountAggregateOutputType> | number
          }
        }
      }
      ActivityLog: {
        payload: Prisma.$ActivityLogPayload<ExtArgs>
        fields: Prisma.ActivityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findFirst: {
            args: Prisma.ActivityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findMany: {
            args: Prisma.ActivityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          create: {
            args: Prisma.ActivityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          createMany: {
            args: Prisma.ActivityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          delete: {
            args: Prisma.ActivityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          update: {
            args: Prisma.ActivityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          deleteMany: {
            args: Prisma.ActivityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          upsert: {
            args: Prisma.ActivityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          aggregate: {
            args: Prisma.ActivityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivityLog>
          }
          groupBy: {
            args: Prisma.ActivityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityLogCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    firm?: FirmOmit
    invitation?: InvitationOmit
    user?: UserOmit
    teamMember?: TeamMemberOmit
    assetFile?: AssetFileOmit
    deal?: DealOmit
    activityLog?: ActivityLogOmit
    task?: TaskOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type FirmCountOutputType
   */

  export type FirmCountOutputType = {
    activityLogs: number
    deals: number
    invitations: number
    teamMembers: number
    users: number
    tasks: number
  }

  export type FirmCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activityLogs?: boolean | FirmCountOutputTypeCountActivityLogsArgs
    deals?: boolean | FirmCountOutputTypeCountDealsArgs
    invitations?: boolean | FirmCountOutputTypeCountInvitationsArgs
    teamMembers?: boolean | FirmCountOutputTypeCountTeamMembersArgs
    users?: boolean | FirmCountOutputTypeCountUsersArgs
    tasks?: boolean | FirmCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * FirmCountOutputType without action
   */
  export type FirmCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FirmCountOutputType
     */
    select?: FirmCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FirmCountOutputType without action
   */
  export type FirmCountOutputTypeCountActivityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
  }

  /**
   * FirmCountOutputType without action
   */
  export type FirmCountOutputTypeCountDealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DealWhereInput
  }

  /**
   * FirmCountOutputType without action
   */
  export type FirmCountOutputTypeCountInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
  }

  /**
   * FirmCountOutputType without action
   */
  export type FirmCountOutputTypeCountTeamMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMemberWhereInput
  }

  /**
   * FirmCountOutputType without action
   */
  export type FirmCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * FirmCountOutputType without action
   */
  export type FirmCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Count Type TeamMemberCountOutputType
   */

  export type TeamMemberCountOutputType = {
    reports: number
    deals: number
    tasks: number
    files: number
  }

  export type TeamMemberCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reports?: boolean | TeamMemberCountOutputTypeCountReportsArgs
    deals?: boolean | TeamMemberCountOutputTypeCountDealsArgs
    tasks?: boolean | TeamMemberCountOutputTypeCountTasksArgs
    files?: boolean | TeamMemberCountOutputTypeCountFilesArgs
  }

  // Custom InputTypes
  /**
   * TeamMemberCountOutputType without action
   */
  export type TeamMemberCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMemberCountOutputType
     */
    select?: TeamMemberCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeamMemberCountOutputType without action
   */
  export type TeamMemberCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMemberWhereInput
  }

  /**
   * TeamMemberCountOutputType without action
   */
  export type TeamMemberCountOutputTypeCountDealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DealWhereInput
  }

  /**
   * TeamMemberCountOutputType without action
   */
  export type TeamMemberCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * TeamMemberCountOutputType without action
   */
  export type TeamMemberCountOutputTypeCountFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssetFileWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Firm
   */

  export type AggregateFirm = {
    _count: FirmCountAggregateOutputType | null
    _avg: FirmAvgAggregateOutputType | null
    _sum: FirmSumAggregateOutputType | null
    _min: FirmMinAggregateOutputType | null
    _max: FirmMaxAggregateOutputType | null
  }

  export type FirmAvgAggregateOutputType = {
    logoScale: number | null
    bioFontSize: number | null
    firmNameFontSize: number | null
    memberPhotoSpacing: number | null
    cardShadowIntensity: number | null
    tombstoneMaxWidth: number | null
    tombstonePadding: number | null
  }

  export type FirmSumAggregateOutputType = {
    logoScale: number | null
    bioFontSize: number | null
    firmNameFontSize: number | null
    memberPhotoSpacing: number | null
    cardShadowIntensity: number | null
    tombstoneMaxWidth: number | null
    tombstonePadding: number | null
  }

  export type FirmMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    logoUrl: string | null
    primaryColor: string | null
    physicalAddress: string | null
    linkedInUrl: string | null
    googleReviewsUrl: string | null
    bio: string | null
    heroMediaUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    accentColor: string | null
    backgroundColor: string | null
    fontColor: string | null
    showAgencyBranding: boolean | null
    logoScale: number | null
    borderRadius: string | null
    bioFontFamily: string | null
    bioFontSize: number | null
    firmNameFontFamily: string | null
    firmNameFontSize: number | null
    firmNameFontWeight: string | null
    isColorLinked: boolean | null
    isFontLinked: boolean | null
    bioFontColor: string | null
    firmNameFontColor: string | null
    memberCardBgColor: string | null
    memberPhotoSpacing: number | null
    showMemberNarrative: boolean | null
    isMemberCardColorLinked: boolean | null
    cardShadowIntensity: number | null
    portfolioListStyle: string | null
    showSearchBar: boolean | null
    teamListStyle: string | null
    viewLayoutMode: string | null
    tombstoneInfoBgColor: string | null
    tombstoneMaxWidth: number | null
    tombstoneMediaBgColor: string | null
    tombstoneMetricsBgColor: string | null
    tombstoneNarrativeBgColor: string | null
    tombstonePadding: number | null
  }

  export type FirmMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    logoUrl: string | null
    primaryColor: string | null
    physicalAddress: string | null
    linkedInUrl: string | null
    googleReviewsUrl: string | null
    bio: string | null
    heroMediaUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    accentColor: string | null
    backgroundColor: string | null
    fontColor: string | null
    showAgencyBranding: boolean | null
    logoScale: number | null
    borderRadius: string | null
    bioFontFamily: string | null
    bioFontSize: number | null
    firmNameFontFamily: string | null
    firmNameFontSize: number | null
    firmNameFontWeight: string | null
    isColorLinked: boolean | null
    isFontLinked: boolean | null
    bioFontColor: string | null
    firmNameFontColor: string | null
    memberCardBgColor: string | null
    memberPhotoSpacing: number | null
    showMemberNarrative: boolean | null
    isMemberCardColorLinked: boolean | null
    cardShadowIntensity: number | null
    portfolioListStyle: string | null
    showSearchBar: boolean | null
    teamListStyle: string | null
    viewLayoutMode: string | null
    tombstoneInfoBgColor: string | null
    tombstoneMaxWidth: number | null
    tombstoneMediaBgColor: string | null
    tombstoneMetricsBgColor: string | null
    tombstoneNarrativeBgColor: string | null
    tombstonePadding: number | null
  }

  export type FirmCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    logoUrl: number
    primaryColor: number
    physicalAddress: number
    linkedInUrl: number
    googleReviewsUrl: number
    bio: number
    heroMediaUrl: number
    createdAt: number
    updatedAt: number
    accentColor: number
    backgroundColor: number
    fontColor: number
    showAgencyBranding: number
    logoScale: number
    borderRadius: number
    bioFontFamily: number
    bioFontSize: number
    firmNameFontFamily: number
    firmNameFontSize: number
    firmNameFontWeight: number
    isColorLinked: number
    isFontLinked: number
    bioFontColor: number
    firmNameFontColor: number
    memberCardBgColor: number
    memberPhotoSpacing: number
    showMemberNarrative: number
    isMemberCardColorLinked: number
    cardShadowIntensity: number
    portfolioListStyle: number
    showSearchBar: number
    teamListStyle: number
    viewLayoutMode: number
    tombstoneInfoBgColor: number
    tombstoneLayout: number
    tombstoneMaxWidth: number
    tombstoneMediaBgColor: number
    tombstoneMetricsBgColor: number
    tombstoneNarrativeBgColor: number
    tombstonePadding: number
    _all: number
  }


  export type FirmAvgAggregateInputType = {
    logoScale?: true
    bioFontSize?: true
    firmNameFontSize?: true
    memberPhotoSpacing?: true
    cardShadowIntensity?: true
    tombstoneMaxWidth?: true
    tombstonePadding?: true
  }

  export type FirmSumAggregateInputType = {
    logoScale?: true
    bioFontSize?: true
    firmNameFontSize?: true
    memberPhotoSpacing?: true
    cardShadowIntensity?: true
    tombstoneMaxWidth?: true
    tombstonePadding?: true
  }

  export type FirmMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    logoUrl?: true
    primaryColor?: true
    physicalAddress?: true
    linkedInUrl?: true
    googleReviewsUrl?: true
    bio?: true
    heroMediaUrl?: true
    createdAt?: true
    updatedAt?: true
    accentColor?: true
    backgroundColor?: true
    fontColor?: true
    showAgencyBranding?: true
    logoScale?: true
    borderRadius?: true
    bioFontFamily?: true
    bioFontSize?: true
    firmNameFontFamily?: true
    firmNameFontSize?: true
    firmNameFontWeight?: true
    isColorLinked?: true
    isFontLinked?: true
    bioFontColor?: true
    firmNameFontColor?: true
    memberCardBgColor?: true
    memberPhotoSpacing?: true
    showMemberNarrative?: true
    isMemberCardColorLinked?: true
    cardShadowIntensity?: true
    portfolioListStyle?: true
    showSearchBar?: true
    teamListStyle?: true
    viewLayoutMode?: true
    tombstoneInfoBgColor?: true
    tombstoneMaxWidth?: true
    tombstoneMediaBgColor?: true
    tombstoneMetricsBgColor?: true
    tombstoneNarrativeBgColor?: true
    tombstonePadding?: true
  }

  export type FirmMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    logoUrl?: true
    primaryColor?: true
    physicalAddress?: true
    linkedInUrl?: true
    googleReviewsUrl?: true
    bio?: true
    heroMediaUrl?: true
    createdAt?: true
    updatedAt?: true
    accentColor?: true
    backgroundColor?: true
    fontColor?: true
    showAgencyBranding?: true
    logoScale?: true
    borderRadius?: true
    bioFontFamily?: true
    bioFontSize?: true
    firmNameFontFamily?: true
    firmNameFontSize?: true
    firmNameFontWeight?: true
    isColorLinked?: true
    isFontLinked?: true
    bioFontColor?: true
    firmNameFontColor?: true
    memberCardBgColor?: true
    memberPhotoSpacing?: true
    showMemberNarrative?: true
    isMemberCardColorLinked?: true
    cardShadowIntensity?: true
    portfolioListStyle?: true
    showSearchBar?: true
    teamListStyle?: true
    viewLayoutMode?: true
    tombstoneInfoBgColor?: true
    tombstoneMaxWidth?: true
    tombstoneMediaBgColor?: true
    tombstoneMetricsBgColor?: true
    tombstoneNarrativeBgColor?: true
    tombstonePadding?: true
  }

  export type FirmCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    logoUrl?: true
    primaryColor?: true
    physicalAddress?: true
    linkedInUrl?: true
    googleReviewsUrl?: true
    bio?: true
    heroMediaUrl?: true
    createdAt?: true
    updatedAt?: true
    accentColor?: true
    backgroundColor?: true
    fontColor?: true
    showAgencyBranding?: true
    logoScale?: true
    borderRadius?: true
    bioFontFamily?: true
    bioFontSize?: true
    firmNameFontFamily?: true
    firmNameFontSize?: true
    firmNameFontWeight?: true
    isColorLinked?: true
    isFontLinked?: true
    bioFontColor?: true
    firmNameFontColor?: true
    memberCardBgColor?: true
    memberPhotoSpacing?: true
    showMemberNarrative?: true
    isMemberCardColorLinked?: true
    cardShadowIntensity?: true
    portfolioListStyle?: true
    showSearchBar?: true
    teamListStyle?: true
    viewLayoutMode?: true
    tombstoneInfoBgColor?: true
    tombstoneLayout?: true
    tombstoneMaxWidth?: true
    tombstoneMediaBgColor?: true
    tombstoneMetricsBgColor?: true
    tombstoneNarrativeBgColor?: true
    tombstonePadding?: true
    _all?: true
  }

  export type FirmAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Firm to aggregate.
     */
    where?: FirmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Firms to fetch.
     */
    orderBy?: FirmOrderByWithRelationInput | FirmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FirmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Firms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Firms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Firms
    **/
    _count?: true | FirmCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FirmAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FirmSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FirmMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FirmMaxAggregateInputType
  }

  export type GetFirmAggregateType<T extends FirmAggregateArgs> = {
        [P in keyof T & keyof AggregateFirm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFirm[P]>
      : GetScalarType<T[P], AggregateFirm[P]>
  }




  export type FirmGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FirmWhereInput
    orderBy?: FirmOrderByWithAggregationInput | FirmOrderByWithAggregationInput[]
    by: FirmScalarFieldEnum[] | FirmScalarFieldEnum
    having?: FirmScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FirmCountAggregateInputType | true
    _avg?: FirmAvgAggregateInputType
    _sum?: FirmSumAggregateInputType
    _min?: FirmMinAggregateInputType
    _max?: FirmMaxAggregateInputType
  }

  export type FirmGroupByOutputType = {
    id: string
    name: string
    slug: string
    logoUrl: string | null
    primaryColor: string | null
    physicalAddress: string | null
    linkedInUrl: string | null
    googleReviewsUrl: string | null
    bio: string | null
    heroMediaUrl: string | null
    createdAt: Date
    updatedAt: Date
    accentColor: string | null
    backgroundColor: string | null
    fontColor: string | null
    showAgencyBranding: boolean
    logoScale: number
    borderRadius: string
    bioFontFamily: string
    bioFontSize: number
    firmNameFontFamily: string
    firmNameFontSize: number
    firmNameFontWeight: string
    isColorLinked: boolean
    isFontLinked: boolean
    bioFontColor: string
    firmNameFontColor: string
    memberCardBgColor: string
    memberPhotoSpacing: number
    showMemberNarrative: boolean
    isMemberCardColorLinked: boolean
    cardShadowIntensity: number
    portfolioListStyle: string
    showSearchBar: boolean
    teamListStyle: string
    viewLayoutMode: string
    tombstoneInfoBgColor: string | null
    tombstoneLayout: string[]
    tombstoneMaxWidth: number
    tombstoneMediaBgColor: string | null
    tombstoneMetricsBgColor: string | null
    tombstoneNarrativeBgColor: string | null
    tombstonePadding: number
    _count: FirmCountAggregateOutputType | null
    _avg: FirmAvgAggregateOutputType | null
    _sum: FirmSumAggregateOutputType | null
    _min: FirmMinAggregateOutputType | null
    _max: FirmMaxAggregateOutputType | null
  }

  type GetFirmGroupByPayload<T extends FirmGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FirmGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FirmGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FirmGroupByOutputType[P]>
            : GetScalarType<T[P], FirmGroupByOutputType[P]>
        }
      >
    >


  export type FirmSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    physicalAddress?: boolean
    linkedInUrl?: boolean
    googleReviewsUrl?: boolean
    bio?: boolean
    heroMediaUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accentColor?: boolean
    backgroundColor?: boolean
    fontColor?: boolean
    showAgencyBranding?: boolean
    logoScale?: boolean
    borderRadius?: boolean
    bioFontFamily?: boolean
    bioFontSize?: boolean
    firmNameFontFamily?: boolean
    firmNameFontSize?: boolean
    firmNameFontWeight?: boolean
    isColorLinked?: boolean
    isFontLinked?: boolean
    bioFontColor?: boolean
    firmNameFontColor?: boolean
    memberCardBgColor?: boolean
    memberPhotoSpacing?: boolean
    showMemberNarrative?: boolean
    isMemberCardColorLinked?: boolean
    cardShadowIntensity?: boolean
    portfolioListStyle?: boolean
    showSearchBar?: boolean
    teamListStyle?: boolean
    viewLayoutMode?: boolean
    tombstoneInfoBgColor?: boolean
    tombstoneLayout?: boolean
    tombstoneMaxWidth?: boolean
    tombstoneMediaBgColor?: boolean
    tombstoneMetricsBgColor?: boolean
    tombstoneNarrativeBgColor?: boolean
    tombstonePadding?: boolean
    activityLogs?: boolean | Firm$activityLogsArgs<ExtArgs>
    deals?: boolean | Firm$dealsArgs<ExtArgs>
    invitations?: boolean | Firm$invitationsArgs<ExtArgs>
    teamMembers?: boolean | Firm$teamMembersArgs<ExtArgs>
    users?: boolean | Firm$usersArgs<ExtArgs>
    tasks?: boolean | Firm$tasksArgs<ExtArgs>
    _count?: boolean | FirmCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["firm"]>

  export type FirmSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    physicalAddress?: boolean
    linkedInUrl?: boolean
    googleReviewsUrl?: boolean
    bio?: boolean
    heroMediaUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accentColor?: boolean
    backgroundColor?: boolean
    fontColor?: boolean
    showAgencyBranding?: boolean
    logoScale?: boolean
    borderRadius?: boolean
    bioFontFamily?: boolean
    bioFontSize?: boolean
    firmNameFontFamily?: boolean
    firmNameFontSize?: boolean
    firmNameFontWeight?: boolean
    isColorLinked?: boolean
    isFontLinked?: boolean
    bioFontColor?: boolean
    firmNameFontColor?: boolean
    memberCardBgColor?: boolean
    memberPhotoSpacing?: boolean
    showMemberNarrative?: boolean
    isMemberCardColorLinked?: boolean
    cardShadowIntensity?: boolean
    portfolioListStyle?: boolean
    showSearchBar?: boolean
    teamListStyle?: boolean
    viewLayoutMode?: boolean
    tombstoneInfoBgColor?: boolean
    tombstoneLayout?: boolean
    tombstoneMaxWidth?: boolean
    tombstoneMediaBgColor?: boolean
    tombstoneMetricsBgColor?: boolean
    tombstoneNarrativeBgColor?: boolean
    tombstonePadding?: boolean
  }, ExtArgs["result"]["firm"]>

  export type FirmSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    physicalAddress?: boolean
    linkedInUrl?: boolean
    googleReviewsUrl?: boolean
    bio?: boolean
    heroMediaUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accentColor?: boolean
    backgroundColor?: boolean
    fontColor?: boolean
    showAgencyBranding?: boolean
    logoScale?: boolean
    borderRadius?: boolean
    bioFontFamily?: boolean
    bioFontSize?: boolean
    firmNameFontFamily?: boolean
    firmNameFontSize?: boolean
    firmNameFontWeight?: boolean
    isColorLinked?: boolean
    isFontLinked?: boolean
    bioFontColor?: boolean
    firmNameFontColor?: boolean
    memberCardBgColor?: boolean
    memberPhotoSpacing?: boolean
    showMemberNarrative?: boolean
    isMemberCardColorLinked?: boolean
    cardShadowIntensity?: boolean
    portfolioListStyle?: boolean
    showSearchBar?: boolean
    teamListStyle?: boolean
    viewLayoutMode?: boolean
    tombstoneInfoBgColor?: boolean
    tombstoneLayout?: boolean
    tombstoneMaxWidth?: boolean
    tombstoneMediaBgColor?: boolean
    tombstoneMetricsBgColor?: boolean
    tombstoneNarrativeBgColor?: boolean
    tombstonePadding?: boolean
  }, ExtArgs["result"]["firm"]>

  export type FirmSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    physicalAddress?: boolean
    linkedInUrl?: boolean
    googleReviewsUrl?: boolean
    bio?: boolean
    heroMediaUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accentColor?: boolean
    backgroundColor?: boolean
    fontColor?: boolean
    showAgencyBranding?: boolean
    logoScale?: boolean
    borderRadius?: boolean
    bioFontFamily?: boolean
    bioFontSize?: boolean
    firmNameFontFamily?: boolean
    firmNameFontSize?: boolean
    firmNameFontWeight?: boolean
    isColorLinked?: boolean
    isFontLinked?: boolean
    bioFontColor?: boolean
    firmNameFontColor?: boolean
    memberCardBgColor?: boolean
    memberPhotoSpacing?: boolean
    showMemberNarrative?: boolean
    isMemberCardColorLinked?: boolean
    cardShadowIntensity?: boolean
    portfolioListStyle?: boolean
    showSearchBar?: boolean
    teamListStyle?: boolean
    viewLayoutMode?: boolean
    tombstoneInfoBgColor?: boolean
    tombstoneLayout?: boolean
    tombstoneMaxWidth?: boolean
    tombstoneMediaBgColor?: boolean
    tombstoneMetricsBgColor?: boolean
    tombstoneNarrativeBgColor?: boolean
    tombstonePadding?: boolean
  }

  export type FirmOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "logoUrl" | "primaryColor" | "physicalAddress" | "linkedInUrl" | "googleReviewsUrl" | "bio" | "heroMediaUrl" | "createdAt" | "updatedAt" | "accentColor" | "backgroundColor" | "fontColor" | "showAgencyBranding" | "logoScale" | "borderRadius" | "bioFontFamily" | "bioFontSize" | "firmNameFontFamily" | "firmNameFontSize" | "firmNameFontWeight" | "isColorLinked" | "isFontLinked" | "bioFontColor" | "firmNameFontColor" | "memberCardBgColor" | "memberPhotoSpacing" | "showMemberNarrative" | "isMemberCardColorLinked" | "cardShadowIntensity" | "portfolioListStyle" | "showSearchBar" | "teamListStyle" | "viewLayoutMode" | "tombstoneInfoBgColor" | "tombstoneLayout" | "tombstoneMaxWidth" | "tombstoneMediaBgColor" | "tombstoneMetricsBgColor" | "tombstoneNarrativeBgColor" | "tombstonePadding", ExtArgs["result"]["firm"]>
  export type FirmInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activityLogs?: boolean | Firm$activityLogsArgs<ExtArgs>
    deals?: boolean | Firm$dealsArgs<ExtArgs>
    invitations?: boolean | Firm$invitationsArgs<ExtArgs>
    teamMembers?: boolean | Firm$teamMembersArgs<ExtArgs>
    users?: boolean | Firm$usersArgs<ExtArgs>
    tasks?: boolean | Firm$tasksArgs<ExtArgs>
    _count?: boolean | FirmCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FirmIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FirmIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FirmPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Firm"
    objects: {
      activityLogs: Prisma.$ActivityLogPayload<ExtArgs>[]
      deals: Prisma.$DealPayload<ExtArgs>[]
      invitations: Prisma.$InvitationPayload<ExtArgs>[]
      teamMembers: Prisma.$TeamMemberPayload<ExtArgs>[]
      users: Prisma.$UserPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      logoUrl: string | null
      primaryColor: string | null
      physicalAddress: string | null
      linkedInUrl: string | null
      googleReviewsUrl: string | null
      bio: string | null
      heroMediaUrl: string | null
      createdAt: Date
      updatedAt: Date
      accentColor: string | null
      backgroundColor: string | null
      fontColor: string | null
      showAgencyBranding: boolean
      logoScale: number
      borderRadius: string
      bioFontFamily: string
      bioFontSize: number
      firmNameFontFamily: string
      firmNameFontSize: number
      firmNameFontWeight: string
      isColorLinked: boolean
      isFontLinked: boolean
      bioFontColor: string
      firmNameFontColor: string
      memberCardBgColor: string
      memberPhotoSpacing: number
      showMemberNarrative: boolean
      isMemberCardColorLinked: boolean
      cardShadowIntensity: number
      portfolioListStyle: string
      showSearchBar: boolean
      teamListStyle: string
      viewLayoutMode: string
      tombstoneInfoBgColor: string | null
      tombstoneLayout: string[]
      tombstoneMaxWidth: number
      tombstoneMediaBgColor: string | null
      tombstoneMetricsBgColor: string | null
      tombstoneNarrativeBgColor: string | null
      tombstonePadding: number
    }, ExtArgs["result"]["firm"]>
    composites: {}
  }

  type FirmGetPayload<S extends boolean | null | undefined | FirmDefaultArgs> = $Result.GetResult<Prisma.$FirmPayload, S>

  type FirmCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FirmFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FirmCountAggregateInputType | true
    }

  export interface FirmDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Firm'], meta: { name: 'Firm' } }
    /**
     * Find zero or one Firm that matches the filter.
     * @param {FirmFindUniqueArgs} args - Arguments to find a Firm
     * @example
     * // Get one Firm
     * const firm = await prisma.firm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FirmFindUniqueArgs>(args: SelectSubset<T, FirmFindUniqueArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Firm that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FirmFindUniqueOrThrowArgs} args - Arguments to find a Firm
     * @example
     * // Get one Firm
     * const firm = await prisma.firm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FirmFindUniqueOrThrowArgs>(args: SelectSubset<T, FirmFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Firm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmFindFirstArgs} args - Arguments to find a Firm
     * @example
     * // Get one Firm
     * const firm = await prisma.firm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FirmFindFirstArgs>(args?: SelectSubset<T, FirmFindFirstArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Firm that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmFindFirstOrThrowArgs} args - Arguments to find a Firm
     * @example
     * // Get one Firm
     * const firm = await prisma.firm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FirmFindFirstOrThrowArgs>(args?: SelectSubset<T, FirmFindFirstOrThrowArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Firms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Firms
     * const firms = await prisma.firm.findMany()
     * 
     * // Get first 10 Firms
     * const firms = await prisma.firm.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const firmWithIdOnly = await prisma.firm.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FirmFindManyArgs>(args?: SelectSubset<T, FirmFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Firm.
     * @param {FirmCreateArgs} args - Arguments to create a Firm.
     * @example
     * // Create one Firm
     * const Firm = await prisma.firm.create({
     *   data: {
     *     // ... data to create a Firm
     *   }
     * })
     * 
     */
    create<T extends FirmCreateArgs>(args: SelectSubset<T, FirmCreateArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Firms.
     * @param {FirmCreateManyArgs} args - Arguments to create many Firms.
     * @example
     * // Create many Firms
     * const firm = await prisma.firm.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FirmCreateManyArgs>(args?: SelectSubset<T, FirmCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Firms and returns the data saved in the database.
     * @param {FirmCreateManyAndReturnArgs} args - Arguments to create many Firms.
     * @example
     * // Create many Firms
     * const firm = await prisma.firm.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Firms and only return the `id`
     * const firmWithIdOnly = await prisma.firm.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FirmCreateManyAndReturnArgs>(args?: SelectSubset<T, FirmCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Firm.
     * @param {FirmDeleteArgs} args - Arguments to delete one Firm.
     * @example
     * // Delete one Firm
     * const Firm = await prisma.firm.delete({
     *   where: {
     *     // ... filter to delete one Firm
     *   }
     * })
     * 
     */
    delete<T extends FirmDeleteArgs>(args: SelectSubset<T, FirmDeleteArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Firm.
     * @param {FirmUpdateArgs} args - Arguments to update one Firm.
     * @example
     * // Update one Firm
     * const firm = await prisma.firm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FirmUpdateArgs>(args: SelectSubset<T, FirmUpdateArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Firms.
     * @param {FirmDeleteManyArgs} args - Arguments to filter Firms to delete.
     * @example
     * // Delete a few Firms
     * const { count } = await prisma.firm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FirmDeleteManyArgs>(args?: SelectSubset<T, FirmDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Firms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Firms
     * const firm = await prisma.firm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FirmUpdateManyArgs>(args: SelectSubset<T, FirmUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Firms and returns the data updated in the database.
     * @param {FirmUpdateManyAndReturnArgs} args - Arguments to update many Firms.
     * @example
     * // Update many Firms
     * const firm = await prisma.firm.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Firms and only return the `id`
     * const firmWithIdOnly = await prisma.firm.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FirmUpdateManyAndReturnArgs>(args: SelectSubset<T, FirmUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Firm.
     * @param {FirmUpsertArgs} args - Arguments to update or create a Firm.
     * @example
     * // Update or create a Firm
     * const firm = await prisma.firm.upsert({
     *   create: {
     *     // ... data to create a Firm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Firm we want to update
     *   }
     * })
     */
    upsert<T extends FirmUpsertArgs>(args: SelectSubset<T, FirmUpsertArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Firms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmCountArgs} args - Arguments to filter Firms to count.
     * @example
     * // Count the number of Firms
     * const count = await prisma.firm.count({
     *   where: {
     *     // ... the filter for the Firms we want to count
     *   }
     * })
    **/
    count<T extends FirmCountArgs>(
      args?: Subset<T, FirmCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FirmCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Firm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FirmAggregateArgs>(args: Subset<T, FirmAggregateArgs>): Prisma.PrismaPromise<GetFirmAggregateType<T>>

    /**
     * Group by Firm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FirmGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FirmGroupByArgs['orderBy'] }
        : { orderBy?: FirmGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FirmGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFirmGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Firm model
   */
  readonly fields: FirmFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Firm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FirmClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    activityLogs<T extends Firm$activityLogsArgs<ExtArgs> = {}>(args?: Subset<T, Firm$activityLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    deals<T extends Firm$dealsArgs<ExtArgs> = {}>(args?: Subset<T, Firm$dealsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invitations<T extends Firm$invitationsArgs<ExtArgs> = {}>(args?: Subset<T, Firm$invitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teamMembers<T extends Firm$teamMembersArgs<ExtArgs> = {}>(args?: Subset<T, Firm$teamMembersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends Firm$usersArgs<ExtArgs> = {}>(args?: Subset<T, Firm$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends Firm$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Firm$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Firm model
   */
  interface FirmFieldRefs {
    readonly id: FieldRef<"Firm", 'String'>
    readonly name: FieldRef<"Firm", 'String'>
    readonly slug: FieldRef<"Firm", 'String'>
    readonly logoUrl: FieldRef<"Firm", 'String'>
    readonly primaryColor: FieldRef<"Firm", 'String'>
    readonly physicalAddress: FieldRef<"Firm", 'String'>
    readonly linkedInUrl: FieldRef<"Firm", 'String'>
    readonly googleReviewsUrl: FieldRef<"Firm", 'String'>
    readonly bio: FieldRef<"Firm", 'String'>
    readonly heroMediaUrl: FieldRef<"Firm", 'String'>
    readonly createdAt: FieldRef<"Firm", 'DateTime'>
    readonly updatedAt: FieldRef<"Firm", 'DateTime'>
    readonly accentColor: FieldRef<"Firm", 'String'>
    readonly backgroundColor: FieldRef<"Firm", 'String'>
    readonly fontColor: FieldRef<"Firm", 'String'>
    readonly showAgencyBranding: FieldRef<"Firm", 'Boolean'>
    readonly logoScale: FieldRef<"Firm", 'Float'>
    readonly borderRadius: FieldRef<"Firm", 'String'>
    readonly bioFontFamily: FieldRef<"Firm", 'String'>
    readonly bioFontSize: FieldRef<"Firm", 'Int'>
    readonly firmNameFontFamily: FieldRef<"Firm", 'String'>
    readonly firmNameFontSize: FieldRef<"Firm", 'Int'>
    readonly firmNameFontWeight: FieldRef<"Firm", 'String'>
    readonly isColorLinked: FieldRef<"Firm", 'Boolean'>
    readonly isFontLinked: FieldRef<"Firm", 'Boolean'>
    readonly bioFontColor: FieldRef<"Firm", 'String'>
    readonly firmNameFontColor: FieldRef<"Firm", 'String'>
    readonly memberCardBgColor: FieldRef<"Firm", 'String'>
    readonly memberPhotoSpacing: FieldRef<"Firm", 'Int'>
    readonly showMemberNarrative: FieldRef<"Firm", 'Boolean'>
    readonly isMemberCardColorLinked: FieldRef<"Firm", 'Boolean'>
    readonly cardShadowIntensity: FieldRef<"Firm", 'Float'>
    readonly portfolioListStyle: FieldRef<"Firm", 'String'>
    readonly showSearchBar: FieldRef<"Firm", 'Boolean'>
    readonly teamListStyle: FieldRef<"Firm", 'String'>
    readonly viewLayoutMode: FieldRef<"Firm", 'String'>
    readonly tombstoneInfoBgColor: FieldRef<"Firm", 'String'>
    readonly tombstoneLayout: FieldRef<"Firm", 'String[]'>
    readonly tombstoneMaxWidth: FieldRef<"Firm", 'Int'>
    readonly tombstoneMediaBgColor: FieldRef<"Firm", 'String'>
    readonly tombstoneMetricsBgColor: FieldRef<"Firm", 'String'>
    readonly tombstoneNarrativeBgColor: FieldRef<"Firm", 'String'>
    readonly tombstonePadding: FieldRef<"Firm", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Firm findUnique
   */
  export type FirmFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
    /**
     * Filter, which Firm to fetch.
     */
    where: FirmWhereUniqueInput
  }

  /**
   * Firm findUniqueOrThrow
   */
  export type FirmFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
    /**
     * Filter, which Firm to fetch.
     */
    where: FirmWhereUniqueInput
  }

  /**
   * Firm findFirst
   */
  export type FirmFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
    /**
     * Filter, which Firm to fetch.
     */
    where?: FirmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Firms to fetch.
     */
    orderBy?: FirmOrderByWithRelationInput | FirmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Firms.
     */
    cursor?: FirmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Firms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Firms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Firms.
     */
    distinct?: FirmScalarFieldEnum | FirmScalarFieldEnum[]
  }

  /**
   * Firm findFirstOrThrow
   */
  export type FirmFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
    /**
     * Filter, which Firm to fetch.
     */
    where?: FirmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Firms to fetch.
     */
    orderBy?: FirmOrderByWithRelationInput | FirmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Firms.
     */
    cursor?: FirmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Firms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Firms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Firms.
     */
    distinct?: FirmScalarFieldEnum | FirmScalarFieldEnum[]
  }

  /**
   * Firm findMany
   */
  export type FirmFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
    /**
     * Filter, which Firms to fetch.
     */
    where?: FirmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Firms to fetch.
     */
    orderBy?: FirmOrderByWithRelationInput | FirmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Firms.
     */
    cursor?: FirmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Firms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Firms.
     */
    skip?: number
    distinct?: FirmScalarFieldEnum | FirmScalarFieldEnum[]
  }

  /**
   * Firm create
   */
  export type FirmCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
    /**
     * The data needed to create a Firm.
     */
    data: XOR<FirmCreateInput, FirmUncheckedCreateInput>
  }

  /**
   * Firm createMany
   */
  export type FirmCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Firms.
     */
    data: FirmCreateManyInput | FirmCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Firm createManyAndReturn
   */
  export type FirmCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * The data used to create many Firms.
     */
    data: FirmCreateManyInput | FirmCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Firm update
   */
  export type FirmUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
    /**
     * The data needed to update a Firm.
     */
    data: XOR<FirmUpdateInput, FirmUncheckedUpdateInput>
    /**
     * Choose, which Firm to update.
     */
    where: FirmWhereUniqueInput
  }

  /**
   * Firm updateMany
   */
  export type FirmUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Firms.
     */
    data: XOR<FirmUpdateManyMutationInput, FirmUncheckedUpdateManyInput>
    /**
     * Filter which Firms to update
     */
    where?: FirmWhereInput
    /**
     * Limit how many Firms to update.
     */
    limit?: number
  }

  /**
   * Firm updateManyAndReturn
   */
  export type FirmUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * The data used to update Firms.
     */
    data: XOR<FirmUpdateManyMutationInput, FirmUncheckedUpdateManyInput>
    /**
     * Filter which Firms to update
     */
    where?: FirmWhereInput
    /**
     * Limit how many Firms to update.
     */
    limit?: number
  }

  /**
   * Firm upsert
   */
  export type FirmUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
    /**
     * The filter to search for the Firm to update in case it exists.
     */
    where: FirmWhereUniqueInput
    /**
     * In case the Firm found by the `where` argument doesn't exist, create a new Firm with this data.
     */
    create: XOR<FirmCreateInput, FirmUncheckedCreateInput>
    /**
     * In case the Firm was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FirmUpdateInput, FirmUncheckedUpdateInput>
  }

  /**
   * Firm delete
   */
  export type FirmDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
    /**
     * Filter which Firm to delete.
     */
    where: FirmWhereUniqueInput
  }

  /**
   * Firm deleteMany
   */
  export type FirmDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Firms to delete
     */
    where?: FirmWhereInput
    /**
     * Limit how many Firms to delete.
     */
    limit?: number
  }

  /**
   * Firm.activityLogs
   */
  export type Firm$activityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    cursor?: ActivityLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * Firm.deals
   */
  export type Firm$dealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    where?: DealWhereInput
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    cursor?: DealWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DealScalarFieldEnum | DealScalarFieldEnum[]
  }

  /**
   * Firm.invitations
   */
  export type Firm$invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    cursor?: InvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Firm.teamMembers
   */
  export type Firm$teamMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    where?: TeamMemberWhereInput
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    cursor?: TeamMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * Firm.users
   */
  export type Firm$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Firm.tasks
   */
  export type Firm$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Firm without action
   */
  export type FirmDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
  }


  /**
   * Model Invitation
   */

  export type AggregateInvitation = {
    _count: InvitationCountAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
  }

  export type InvitationMinAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    role: $Enums.UserRole | null
    firmId: string | null
    isUsed: boolean | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type InvitationMaxAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    role: $Enums.UserRole | null
    firmId: string | null
    isUsed: boolean | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type InvitationCountAggregateOutputType = {
    id: number
    email: number
    token: number
    role: number
    firmId: number
    isUsed: number
    createdAt: number
    expiresAt: number
    _all: number
  }


  export type InvitationMinAggregateInputType = {
    id?: true
    email?: true
    token?: true
    role?: true
    firmId?: true
    isUsed?: true
    createdAt?: true
    expiresAt?: true
  }

  export type InvitationMaxAggregateInputType = {
    id?: true
    email?: true
    token?: true
    role?: true
    firmId?: true
    isUsed?: true
    createdAt?: true
    expiresAt?: true
  }

  export type InvitationCountAggregateInputType = {
    id?: true
    email?: true
    token?: true
    role?: true
    firmId?: true
    isUsed?: true
    createdAt?: true
    expiresAt?: true
    _all?: true
  }

  export type InvitationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invitation to aggregate.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invitations
    **/
    _count?: true | InvitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvitationMaxAggregateInputType
  }

  export type GetInvitationAggregateType<T extends InvitationAggregateArgs> = {
        [P in keyof T & keyof AggregateInvitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvitation[P]>
      : GetScalarType<T[P], AggregateInvitation[P]>
  }




  export type InvitationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithAggregationInput | InvitationOrderByWithAggregationInput[]
    by: InvitationScalarFieldEnum[] | InvitationScalarFieldEnum
    having?: InvitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvitationCountAggregateInputType | true
    _min?: InvitationMinAggregateInputType
    _max?: InvitationMaxAggregateInputType
  }

  export type InvitationGroupByOutputType = {
    id: string
    email: string
    token: string
    role: $Enums.UserRole
    firmId: string
    isUsed: boolean
    createdAt: Date
    expiresAt: Date
    _count: InvitationCountAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
  }

  type GetInvitationGroupByPayload<T extends InvitationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvitationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvitationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvitationGroupByOutputType[P]>
            : GetScalarType<T[P], InvitationGroupByOutputType[P]>
        }
      >
    >


  export type InvitationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    role?: boolean
    firmId?: boolean
    isUsed?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>

  export type InvitationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    role?: boolean
    firmId?: boolean
    isUsed?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>

  export type InvitationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    role?: boolean
    firmId?: boolean
    isUsed?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>

  export type InvitationSelectScalar = {
    id?: boolean
    email?: boolean
    token?: boolean
    role?: boolean
    firmId?: boolean
    isUsed?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }

  export type InvitationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "token" | "role" | "firmId" | "isUsed" | "createdAt" | "expiresAt", ExtArgs["result"]["invitation"]>
  export type InvitationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }
  export type InvitationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }
  export type InvitationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }

  export type $InvitationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invitation"
    objects: {
      firm: Prisma.$FirmPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      token: string
      role: $Enums.UserRole
      firmId: string
      isUsed: boolean
      createdAt: Date
      expiresAt: Date
    }, ExtArgs["result"]["invitation"]>
    composites: {}
  }

  type InvitationGetPayload<S extends boolean | null | undefined | InvitationDefaultArgs> = $Result.GetResult<Prisma.$InvitationPayload, S>

  type InvitationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvitationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvitationCountAggregateInputType | true
    }

  export interface InvitationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invitation'], meta: { name: 'Invitation' } }
    /**
     * Find zero or one Invitation that matches the filter.
     * @param {InvitationFindUniqueArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvitationFindUniqueArgs>(args: SelectSubset<T, InvitationFindUniqueArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Invitation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvitationFindUniqueOrThrowArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvitationFindUniqueOrThrowArgs>(args: SelectSubset<T, InvitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindFirstArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvitationFindFirstArgs>(args?: SelectSubset<T, InvitationFindFirstArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindFirstOrThrowArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvitationFindFirstOrThrowArgs>(args?: SelectSubset<T, InvitationFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Invitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invitations
     * const invitations = await prisma.invitation.findMany()
     * 
     * // Get first 10 Invitations
     * const invitations = await prisma.invitation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invitationWithIdOnly = await prisma.invitation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvitationFindManyArgs>(args?: SelectSubset<T, InvitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Invitation.
     * @param {InvitationCreateArgs} args - Arguments to create a Invitation.
     * @example
     * // Create one Invitation
     * const Invitation = await prisma.invitation.create({
     *   data: {
     *     // ... data to create a Invitation
     *   }
     * })
     * 
     */
    create<T extends InvitationCreateArgs>(args: SelectSubset<T, InvitationCreateArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Invitations.
     * @param {InvitationCreateManyArgs} args - Arguments to create many Invitations.
     * @example
     * // Create many Invitations
     * const invitation = await prisma.invitation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvitationCreateManyArgs>(args?: SelectSubset<T, InvitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invitations and returns the data saved in the database.
     * @param {InvitationCreateManyAndReturnArgs} args - Arguments to create many Invitations.
     * @example
     * // Create many Invitations
     * const invitation = await prisma.invitation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invitations and only return the `id`
     * const invitationWithIdOnly = await prisma.invitation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvitationCreateManyAndReturnArgs>(args?: SelectSubset<T, InvitationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Invitation.
     * @param {InvitationDeleteArgs} args - Arguments to delete one Invitation.
     * @example
     * // Delete one Invitation
     * const Invitation = await prisma.invitation.delete({
     *   where: {
     *     // ... filter to delete one Invitation
     *   }
     * })
     * 
     */
    delete<T extends InvitationDeleteArgs>(args: SelectSubset<T, InvitationDeleteArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Invitation.
     * @param {InvitationUpdateArgs} args - Arguments to update one Invitation.
     * @example
     * // Update one Invitation
     * const invitation = await prisma.invitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvitationUpdateArgs>(args: SelectSubset<T, InvitationUpdateArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Invitations.
     * @param {InvitationDeleteManyArgs} args - Arguments to filter Invitations to delete.
     * @example
     * // Delete a few Invitations
     * const { count } = await prisma.invitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvitationDeleteManyArgs>(args?: SelectSubset<T, InvitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invitations
     * const invitation = await prisma.invitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvitationUpdateManyArgs>(args: SelectSubset<T, InvitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invitations and returns the data updated in the database.
     * @param {InvitationUpdateManyAndReturnArgs} args - Arguments to update many Invitations.
     * @example
     * // Update many Invitations
     * const invitation = await prisma.invitation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Invitations and only return the `id`
     * const invitationWithIdOnly = await prisma.invitation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InvitationUpdateManyAndReturnArgs>(args: SelectSubset<T, InvitationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Invitation.
     * @param {InvitationUpsertArgs} args - Arguments to update or create a Invitation.
     * @example
     * // Update or create a Invitation
     * const invitation = await prisma.invitation.upsert({
     *   create: {
     *     // ... data to create a Invitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invitation we want to update
     *   }
     * })
     */
    upsert<T extends InvitationUpsertArgs>(args: SelectSubset<T, InvitationUpsertArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationCountArgs} args - Arguments to filter Invitations to count.
     * @example
     * // Count the number of Invitations
     * const count = await prisma.invitation.count({
     *   where: {
     *     // ... the filter for the Invitations we want to count
     *   }
     * })
    **/
    count<T extends InvitationCountArgs>(
      args?: Subset<T, InvitationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvitationAggregateArgs>(args: Subset<T, InvitationAggregateArgs>): Prisma.PrismaPromise<GetInvitationAggregateType<T>>

    /**
     * Group by Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvitationGroupByArgs['orderBy'] }
        : { orderBy?: InvitationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invitation model
   */
  readonly fields: InvitationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvitationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    firm<T extends FirmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FirmDefaultArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Invitation model
   */
  interface InvitationFieldRefs {
    readonly id: FieldRef<"Invitation", 'String'>
    readonly email: FieldRef<"Invitation", 'String'>
    readonly token: FieldRef<"Invitation", 'String'>
    readonly role: FieldRef<"Invitation", 'UserRole'>
    readonly firmId: FieldRef<"Invitation", 'String'>
    readonly isUsed: FieldRef<"Invitation", 'Boolean'>
    readonly createdAt: FieldRef<"Invitation", 'DateTime'>
    readonly expiresAt: FieldRef<"Invitation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Invitation findUnique
   */
  export type InvitationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation findUniqueOrThrow
   */
  export type InvitationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation findFirst
   */
  export type InvitationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     */
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation findFirstOrThrow
   */
  export type InvitationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     */
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation findMany
   */
  export type InvitationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitations to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }

  /**
   * Invitation create
   */
  export type InvitationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The data needed to create a Invitation.
     */
    data: XOR<InvitationCreateInput, InvitationUncheckedCreateInput>
  }

  /**
   * Invitation createMany
   */
  export type InvitationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invitations.
     */
    data: InvitationCreateManyInput | InvitationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invitation createManyAndReturn
   */
  export type InvitationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * The data used to create many Invitations.
     */
    data: InvitationCreateManyInput | InvitationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invitation update
   */
  export type InvitationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The data needed to update a Invitation.
     */
    data: XOR<InvitationUpdateInput, InvitationUncheckedUpdateInput>
    /**
     * Choose, which Invitation to update.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation updateMany
   */
  export type InvitationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invitations.
     */
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyInput>
    /**
     * Filter which Invitations to update
     */
    where?: InvitationWhereInput
    /**
     * Limit how many Invitations to update.
     */
    limit?: number
  }

  /**
   * Invitation updateManyAndReturn
   */
  export type InvitationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * The data used to update Invitations.
     */
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyInput>
    /**
     * Filter which Invitations to update
     */
    where?: InvitationWhereInput
    /**
     * Limit how many Invitations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invitation upsert
   */
  export type InvitationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The filter to search for the Invitation to update in case it exists.
     */
    where: InvitationWhereUniqueInput
    /**
     * In case the Invitation found by the `where` argument doesn't exist, create a new Invitation with this data.
     */
    create: XOR<InvitationCreateInput, InvitationUncheckedCreateInput>
    /**
     * In case the Invitation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvitationUpdateInput, InvitationUncheckedUpdateInput>
  }

  /**
   * Invitation delete
   */
  export type InvitationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter which Invitation to delete.
     */
    where: InvitationWhereUniqueInput
  }

  /**
   * Invitation deleteMany
   */
  export type InvitationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invitations to delete
     */
    where?: InvitationWhereInput
    /**
     * Limit how many Invitations to delete.
     */
    limit?: number
  }

  /**
   * Invitation without action
   */
  export type InvitationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invitation
     */
    omit?: InvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvitationInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: $Enums.UserRole | null
    firmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    resetToken: string | null
    resetTokenExpires: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: $Enums.UserRole | null
    firmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    resetToken: string | null
    resetTokenExpires: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    role: number
    firmId: number
    createdAt: number
    updatedAt: number
    name: number
    resetToken: number
    resetTokenExpires: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    firmId?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    resetToken?: true
    resetTokenExpires?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    firmId?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    resetToken?: true
    resetTokenExpires?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    firmId?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    resetToken?: true
    resetTokenExpires?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    role: $Enums.UserRole
    firmId: string
    createdAt: Date
    updatedAt: Date
    name: string | null
    resetToken: string | null
    resetTokenExpires: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    resetToken?: boolean
    resetTokenExpires?: boolean
    professionalProfile?: boolean | User$professionalProfileArgs<ExtArgs>
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    resetToken?: boolean
    resetTokenExpires?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    resetToken?: boolean
    resetTokenExpires?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    resetToken?: boolean
    resetTokenExpires?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "role" | "firmId" | "createdAt" | "updatedAt" | "name" | "resetToken" | "resetTokenExpires", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professionalProfile?: boolean | User$professionalProfileArgs<ExtArgs>
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      professionalProfile: Prisma.$TeamMemberPayload<ExtArgs> | null
      firm: Prisma.$FirmPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      role: $Enums.UserRole
      firmId: string
      createdAt: Date
      updatedAt: Date
      name: string | null
      resetToken: string | null
      resetTokenExpires: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professionalProfile<T extends User$professionalProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$professionalProfileArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    firm<T extends FirmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FirmDefaultArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly firmId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly name: FieldRef<"User", 'String'>
    readonly resetToken: FieldRef<"User", 'String'>
    readonly resetTokenExpires: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.professionalProfile
   */
  export type User$professionalProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    where?: TeamMemberWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model TeamMember
   */

  export type AggregateTeamMember = {
    _count: TeamMemberCountAggregateOutputType | null
    _avg: TeamMemberAvgAggregateOutputType | null
    _sum: TeamMemberSumAggregateOutputType | null
    _min: TeamMemberMinAggregateOutputType | null
    _max: TeamMemberMaxAggregateOutputType | null
  }

  export type TeamMemberAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type TeamMemberSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type TeamMemberMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    role: string | null
    email: string | null
    imageURL: string | null
    firmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    bio: string | null
    heroMediaUrl: string | null
    linkedInUrl: string | null
    phoneNumber: string | null
    sortOrder: number | null
    userId: string | null
    department: string | null
    managerId: string | null
  }

  export type TeamMemberMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    role: string | null
    email: string | null
    imageURL: string | null
    firmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    bio: string | null
    heroMediaUrl: string | null
    linkedInUrl: string | null
    phoneNumber: string | null
    sortOrder: number | null
    userId: string | null
    department: string | null
    managerId: string | null
  }

  export type TeamMemberCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    role: number
    email: number
    imageURL: number
    firmId: number
    createdAt: number
    updatedAt: number
    bio: number
    firmIds: number
    heroMediaUrl: number
    linkedInUrl: number
    phoneNumber: number
    sortOrder: number
    userId: number
    department: number
    managerId: number
    _all: number
  }


  export type TeamMemberAvgAggregateInputType = {
    sortOrder?: true
  }

  export type TeamMemberSumAggregateInputType = {
    sortOrder?: true
  }

  export type TeamMemberMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    role?: true
    email?: true
    imageURL?: true
    firmId?: true
    createdAt?: true
    updatedAt?: true
    bio?: true
    heroMediaUrl?: true
    linkedInUrl?: true
    phoneNumber?: true
    sortOrder?: true
    userId?: true
    department?: true
    managerId?: true
  }

  export type TeamMemberMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    role?: true
    email?: true
    imageURL?: true
    firmId?: true
    createdAt?: true
    updatedAt?: true
    bio?: true
    heroMediaUrl?: true
    linkedInUrl?: true
    phoneNumber?: true
    sortOrder?: true
    userId?: true
    department?: true
    managerId?: true
  }

  export type TeamMemberCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    role?: true
    email?: true
    imageURL?: true
    firmId?: true
    createdAt?: true
    updatedAt?: true
    bio?: true
    firmIds?: true
    heroMediaUrl?: true
    linkedInUrl?: true
    phoneNumber?: true
    sortOrder?: true
    userId?: true
    department?: true
    managerId?: true
    _all?: true
  }

  export type TeamMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMember to aggregate.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeamMembers
    **/
    _count?: true | TeamMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeamMemberAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeamMemberSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMemberMaxAggregateInputType
  }

  export type GetTeamMemberAggregateType<T extends TeamMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateTeamMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamMember[P]>
      : GetScalarType<T[P], AggregateTeamMember[P]>
  }




  export type TeamMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMemberWhereInput
    orderBy?: TeamMemberOrderByWithAggregationInput | TeamMemberOrderByWithAggregationInput[]
    by: TeamMemberScalarFieldEnum[] | TeamMemberScalarFieldEnum
    having?: TeamMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamMemberCountAggregateInputType | true
    _avg?: TeamMemberAvgAggregateInputType
    _sum?: TeamMemberSumAggregateInputType
    _min?: TeamMemberMinAggregateInputType
    _max?: TeamMemberMaxAggregateInputType
  }

  export type TeamMemberGroupByOutputType = {
    id: string
    name: string
    slug: string
    role: string
    email: string | null
    imageURL: string | null
    firmId: string
    createdAt: Date
    updatedAt: Date
    bio: string | null
    firmIds: string[]
    heroMediaUrl: string | null
    linkedInUrl: string | null
    phoneNumber: string | null
    sortOrder: number
    userId: string | null
    department: string | null
    managerId: string | null
    _count: TeamMemberCountAggregateOutputType | null
    _avg: TeamMemberAvgAggregateOutputType | null
    _sum: TeamMemberSumAggregateOutputType | null
    _min: TeamMemberMinAggregateOutputType | null
    _max: TeamMemberMaxAggregateOutputType | null
  }

  type GetTeamMemberGroupByPayload<T extends TeamMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamMemberGroupByOutputType[P]>
            : GetScalarType<T[P], TeamMemberGroupByOutputType[P]>
        }
      >
    >


  export type TeamMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    role?: boolean
    email?: boolean
    imageURL?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bio?: boolean
    firmIds?: boolean
    heroMediaUrl?: boolean
    linkedInUrl?: boolean
    phoneNumber?: boolean
    sortOrder?: boolean
    userId?: boolean
    department?: boolean
    managerId?: boolean
    manager?: boolean | TeamMember$managerArgs<ExtArgs>
    reports?: boolean | TeamMember$reportsArgs<ExtArgs>
    deals?: boolean | TeamMember$dealsArgs<ExtArgs>
    tasks?: boolean | TeamMember$tasksArgs<ExtArgs>
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    user?: boolean | TeamMember$userArgs<ExtArgs>
    files?: boolean | TeamMember$filesArgs<ExtArgs>
    _count?: boolean | TeamMemberCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamMember"]>

  export type TeamMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    role?: boolean
    email?: boolean
    imageURL?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bio?: boolean
    firmIds?: boolean
    heroMediaUrl?: boolean
    linkedInUrl?: boolean
    phoneNumber?: boolean
    sortOrder?: boolean
    userId?: boolean
    department?: boolean
    managerId?: boolean
    manager?: boolean | TeamMember$managerArgs<ExtArgs>
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    user?: boolean | TeamMember$userArgs<ExtArgs>
  }, ExtArgs["result"]["teamMember"]>

  export type TeamMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    role?: boolean
    email?: boolean
    imageURL?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bio?: boolean
    firmIds?: boolean
    heroMediaUrl?: boolean
    linkedInUrl?: boolean
    phoneNumber?: boolean
    sortOrder?: boolean
    userId?: boolean
    department?: boolean
    managerId?: boolean
    manager?: boolean | TeamMember$managerArgs<ExtArgs>
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    user?: boolean | TeamMember$userArgs<ExtArgs>
  }, ExtArgs["result"]["teamMember"]>

  export type TeamMemberSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    role?: boolean
    email?: boolean
    imageURL?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bio?: boolean
    firmIds?: boolean
    heroMediaUrl?: boolean
    linkedInUrl?: boolean
    phoneNumber?: boolean
    sortOrder?: boolean
    userId?: boolean
    department?: boolean
    managerId?: boolean
  }

  export type TeamMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "role" | "email" | "imageURL" | "firmId" | "createdAt" | "updatedAt" | "bio" | "firmIds" | "heroMediaUrl" | "linkedInUrl" | "phoneNumber" | "sortOrder" | "userId" | "department" | "managerId", ExtArgs["result"]["teamMember"]>
  export type TeamMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manager?: boolean | TeamMember$managerArgs<ExtArgs>
    reports?: boolean | TeamMember$reportsArgs<ExtArgs>
    deals?: boolean | TeamMember$dealsArgs<ExtArgs>
    tasks?: boolean | TeamMember$tasksArgs<ExtArgs>
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    user?: boolean | TeamMember$userArgs<ExtArgs>
    files?: boolean | TeamMember$filesArgs<ExtArgs>
    _count?: boolean | TeamMemberCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeamMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manager?: boolean | TeamMember$managerArgs<ExtArgs>
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    user?: boolean | TeamMember$userArgs<ExtArgs>
  }
  export type TeamMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manager?: boolean | TeamMember$managerArgs<ExtArgs>
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    user?: boolean | TeamMember$userArgs<ExtArgs>
  }

  export type $TeamMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TeamMember"
    objects: {
      manager: Prisma.$TeamMemberPayload<ExtArgs> | null
      reports: Prisma.$TeamMemberPayload<ExtArgs>[]
      deals: Prisma.$DealPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      firm: Prisma.$FirmPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
      files: Prisma.$AssetFilePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      role: string
      email: string | null
      imageURL: string | null
      firmId: string
      createdAt: Date
      updatedAt: Date
      bio: string | null
      firmIds: string[]
      heroMediaUrl: string | null
      linkedInUrl: string | null
      phoneNumber: string | null
      sortOrder: number
      userId: string | null
      department: string | null
      managerId: string | null
    }, ExtArgs["result"]["teamMember"]>
    composites: {}
  }

  type TeamMemberGetPayload<S extends boolean | null | undefined | TeamMemberDefaultArgs> = $Result.GetResult<Prisma.$TeamMemberPayload, S>

  type TeamMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamMemberCountAggregateInputType | true
    }

  export interface TeamMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TeamMember'], meta: { name: 'TeamMember' } }
    /**
     * Find zero or one TeamMember that matches the filter.
     * @param {TeamMemberFindUniqueArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamMemberFindUniqueArgs>(args: SelectSubset<T, TeamMemberFindUniqueArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TeamMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamMemberFindUniqueOrThrowArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindFirstArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamMemberFindFirstArgs>(args?: SelectSubset<T, TeamMemberFindFirstArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindFirstOrThrowArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TeamMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeamMembers
     * const teamMembers = await prisma.teamMember.findMany()
     * 
     * // Get first 10 TeamMembers
     * const teamMembers = await prisma.teamMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamMemberWithIdOnly = await prisma.teamMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamMemberFindManyArgs>(args?: SelectSubset<T, TeamMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TeamMember.
     * @param {TeamMemberCreateArgs} args - Arguments to create a TeamMember.
     * @example
     * // Create one TeamMember
     * const TeamMember = await prisma.teamMember.create({
     *   data: {
     *     // ... data to create a TeamMember
     *   }
     * })
     * 
     */
    create<T extends TeamMemberCreateArgs>(args: SelectSubset<T, TeamMemberCreateArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TeamMembers.
     * @param {TeamMemberCreateManyArgs} args - Arguments to create many TeamMembers.
     * @example
     * // Create many TeamMembers
     * const teamMember = await prisma.teamMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamMemberCreateManyArgs>(args?: SelectSubset<T, TeamMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TeamMembers and returns the data saved in the database.
     * @param {TeamMemberCreateManyAndReturnArgs} args - Arguments to create many TeamMembers.
     * @example
     * // Create many TeamMembers
     * const teamMember = await prisma.teamMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TeamMembers and only return the `id`
     * const teamMemberWithIdOnly = await prisma.teamMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TeamMember.
     * @param {TeamMemberDeleteArgs} args - Arguments to delete one TeamMember.
     * @example
     * // Delete one TeamMember
     * const TeamMember = await prisma.teamMember.delete({
     *   where: {
     *     // ... filter to delete one TeamMember
     *   }
     * })
     * 
     */
    delete<T extends TeamMemberDeleteArgs>(args: SelectSubset<T, TeamMemberDeleteArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TeamMember.
     * @param {TeamMemberUpdateArgs} args - Arguments to update one TeamMember.
     * @example
     * // Update one TeamMember
     * const teamMember = await prisma.teamMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamMemberUpdateArgs>(args: SelectSubset<T, TeamMemberUpdateArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TeamMembers.
     * @param {TeamMemberDeleteManyArgs} args - Arguments to filter TeamMembers to delete.
     * @example
     * // Delete a few TeamMembers
     * const { count } = await prisma.teamMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamMemberDeleteManyArgs>(args?: SelectSubset<T, TeamMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeamMembers
     * const teamMember = await prisma.teamMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamMemberUpdateManyArgs>(args: SelectSubset<T, TeamMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamMembers and returns the data updated in the database.
     * @param {TeamMemberUpdateManyAndReturnArgs} args - Arguments to update many TeamMembers.
     * @example
     * // Update many TeamMembers
     * const teamMember = await prisma.teamMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TeamMembers and only return the `id`
     * const teamMemberWithIdOnly = await prisma.teamMember.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeamMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, TeamMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TeamMember.
     * @param {TeamMemberUpsertArgs} args - Arguments to update or create a TeamMember.
     * @example
     * // Update or create a TeamMember
     * const teamMember = await prisma.teamMember.upsert({
     *   create: {
     *     // ... data to create a TeamMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeamMember we want to update
     *   }
     * })
     */
    upsert<T extends TeamMemberUpsertArgs>(args: SelectSubset<T, TeamMemberUpsertArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TeamMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberCountArgs} args - Arguments to filter TeamMembers to count.
     * @example
     * // Count the number of TeamMembers
     * const count = await prisma.teamMember.count({
     *   where: {
     *     // ... the filter for the TeamMembers we want to count
     *   }
     * })
    **/
    count<T extends TeamMemberCountArgs>(
      args?: Subset<T, TeamMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeamMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamMemberAggregateArgs>(args: Subset<T, TeamMemberAggregateArgs>): Prisma.PrismaPromise<GetTeamMemberAggregateType<T>>

    /**
     * Group by TeamMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamMemberGroupByArgs['orderBy'] }
        : { orderBy?: TeamMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TeamMember model
   */
  readonly fields: TeamMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TeamMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    manager<T extends TeamMember$managerArgs<ExtArgs> = {}>(args?: Subset<T, TeamMember$managerArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    reports<T extends TeamMember$reportsArgs<ExtArgs> = {}>(args?: Subset<T, TeamMember$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    deals<T extends TeamMember$dealsArgs<ExtArgs> = {}>(args?: Subset<T, TeamMember$dealsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends TeamMember$tasksArgs<ExtArgs> = {}>(args?: Subset<T, TeamMember$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    firm<T extends FirmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FirmDefaultArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends TeamMember$userArgs<ExtArgs> = {}>(args?: Subset<T, TeamMember$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    files<T extends TeamMember$filesArgs<ExtArgs> = {}>(args?: Subset<T, TeamMember$filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TeamMember model
   */
  interface TeamMemberFieldRefs {
    readonly id: FieldRef<"TeamMember", 'String'>
    readonly name: FieldRef<"TeamMember", 'String'>
    readonly slug: FieldRef<"TeamMember", 'String'>
    readonly role: FieldRef<"TeamMember", 'String'>
    readonly email: FieldRef<"TeamMember", 'String'>
    readonly imageURL: FieldRef<"TeamMember", 'String'>
    readonly firmId: FieldRef<"TeamMember", 'String'>
    readonly createdAt: FieldRef<"TeamMember", 'DateTime'>
    readonly updatedAt: FieldRef<"TeamMember", 'DateTime'>
    readonly bio: FieldRef<"TeamMember", 'String'>
    readonly firmIds: FieldRef<"TeamMember", 'String[]'>
    readonly heroMediaUrl: FieldRef<"TeamMember", 'String'>
    readonly linkedInUrl: FieldRef<"TeamMember", 'String'>
    readonly phoneNumber: FieldRef<"TeamMember", 'String'>
    readonly sortOrder: FieldRef<"TeamMember", 'Int'>
    readonly userId: FieldRef<"TeamMember", 'String'>
    readonly department: FieldRef<"TeamMember", 'String'>
    readonly managerId: FieldRef<"TeamMember", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TeamMember findUnique
   */
  export type TeamMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember findUniqueOrThrow
   */
  export type TeamMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember findFirst
   */
  export type TeamMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMembers.
     */
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember findFirstOrThrow
   */
  export type TeamMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMembers.
     */
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember findMany
   */
  export type TeamMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMembers to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember create
   */
  export type TeamMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a TeamMember.
     */
    data: XOR<TeamMemberCreateInput, TeamMemberUncheckedCreateInput>
  }

  /**
   * TeamMember createMany
   */
  export type TeamMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TeamMembers.
     */
    data: TeamMemberCreateManyInput | TeamMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TeamMember createManyAndReturn
   */
  export type TeamMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * The data used to create many TeamMembers.
     */
    data: TeamMemberCreateManyInput | TeamMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TeamMember update
   */
  export type TeamMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a TeamMember.
     */
    data: XOR<TeamMemberUpdateInput, TeamMemberUncheckedUpdateInput>
    /**
     * Choose, which TeamMember to update.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember updateMany
   */
  export type TeamMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TeamMembers.
     */
    data: XOR<TeamMemberUpdateManyMutationInput, TeamMemberUncheckedUpdateManyInput>
    /**
     * Filter which TeamMembers to update
     */
    where?: TeamMemberWhereInput
    /**
     * Limit how many TeamMembers to update.
     */
    limit?: number
  }

  /**
   * TeamMember updateManyAndReturn
   */
  export type TeamMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * The data used to update TeamMembers.
     */
    data: XOR<TeamMemberUpdateManyMutationInput, TeamMemberUncheckedUpdateManyInput>
    /**
     * Filter which TeamMembers to update
     */
    where?: TeamMemberWhereInput
    /**
     * Limit how many TeamMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TeamMember upsert
   */
  export type TeamMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the TeamMember to update in case it exists.
     */
    where: TeamMemberWhereUniqueInput
    /**
     * In case the TeamMember found by the `where` argument doesn't exist, create a new TeamMember with this data.
     */
    create: XOR<TeamMemberCreateInput, TeamMemberUncheckedCreateInput>
    /**
     * In case the TeamMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamMemberUpdateInput, TeamMemberUncheckedUpdateInput>
  }

  /**
   * TeamMember delete
   */
  export type TeamMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter which TeamMember to delete.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember deleteMany
   */
  export type TeamMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMembers to delete
     */
    where?: TeamMemberWhereInput
    /**
     * Limit how many TeamMembers to delete.
     */
    limit?: number
  }

  /**
   * TeamMember.manager
   */
  export type TeamMember$managerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    where?: TeamMemberWhereInput
  }

  /**
   * TeamMember.reports
   */
  export type TeamMember$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    where?: TeamMemberWhereInput
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    cursor?: TeamMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember.deals
   */
  export type TeamMember$dealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    where?: DealWhereInput
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    cursor?: DealWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DealScalarFieldEnum | DealScalarFieldEnum[]
  }

  /**
   * TeamMember.tasks
   */
  export type TeamMember$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * TeamMember.user
   */
  export type TeamMember$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TeamMember.files
   */
  export type TeamMember$filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetFile
     */
    select?: AssetFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetFile
     */
    omit?: AssetFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetFileInclude<ExtArgs> | null
    where?: AssetFileWhereInput
    orderBy?: AssetFileOrderByWithRelationInput | AssetFileOrderByWithRelationInput[]
    cursor?: AssetFileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssetFileScalarFieldEnum | AssetFileScalarFieldEnum[]
  }

  /**
   * TeamMember without action
   */
  export type TeamMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
  }


  /**
   * Model AssetFile
   */

  export type AggregateAssetFile = {
    _count: AssetFileCountAggregateOutputType | null
    _min: AssetFileMinAggregateOutputType | null
    _max: AssetFileMaxAggregateOutputType | null
  }

  export type AssetFileMinAggregateOutputType = {
    id: string | null
    name: string | null
    content: string | null
    type: string | null
    teamMemberId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssetFileMaxAggregateOutputType = {
    id: string | null
    name: string | null
    content: string | null
    type: string | null
    teamMemberId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssetFileCountAggregateOutputType = {
    id: number
    name: number
    content: number
    type: number
    teamMemberId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AssetFileMinAggregateInputType = {
    id?: true
    name?: true
    content?: true
    type?: true
    teamMemberId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssetFileMaxAggregateInputType = {
    id?: true
    name?: true
    content?: true
    type?: true
    teamMemberId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssetFileCountAggregateInputType = {
    id?: true
    name?: true
    content?: true
    type?: true
    teamMemberId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AssetFileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssetFile to aggregate.
     */
    where?: AssetFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssetFiles to fetch.
     */
    orderBy?: AssetFileOrderByWithRelationInput | AssetFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssetFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssetFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssetFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AssetFiles
    **/
    _count?: true | AssetFileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssetFileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssetFileMaxAggregateInputType
  }

  export type GetAssetFileAggregateType<T extends AssetFileAggregateArgs> = {
        [P in keyof T & keyof AggregateAssetFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssetFile[P]>
      : GetScalarType<T[P], AggregateAssetFile[P]>
  }




  export type AssetFileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssetFileWhereInput
    orderBy?: AssetFileOrderByWithAggregationInput | AssetFileOrderByWithAggregationInput[]
    by: AssetFileScalarFieldEnum[] | AssetFileScalarFieldEnum
    having?: AssetFileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssetFileCountAggregateInputType | true
    _min?: AssetFileMinAggregateInputType
    _max?: AssetFileMaxAggregateInputType
  }

  export type AssetFileGroupByOutputType = {
    id: string
    name: string
    content: string
    type: string
    teamMemberId: string
    createdAt: Date
    updatedAt: Date
    _count: AssetFileCountAggregateOutputType | null
    _min: AssetFileMinAggregateOutputType | null
    _max: AssetFileMaxAggregateOutputType | null
  }

  type GetAssetFileGroupByPayload<T extends AssetFileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssetFileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssetFileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssetFileGroupByOutputType[P]>
            : GetScalarType<T[P], AssetFileGroupByOutputType[P]>
        }
      >
    >


  export type AssetFileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    content?: boolean
    type?: boolean
    teamMemberId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    teamMember?: boolean | TeamMemberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assetFile"]>

  export type AssetFileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    content?: boolean
    type?: boolean
    teamMemberId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    teamMember?: boolean | TeamMemberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assetFile"]>

  export type AssetFileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    content?: boolean
    type?: boolean
    teamMemberId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    teamMember?: boolean | TeamMemberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assetFile"]>

  export type AssetFileSelectScalar = {
    id?: boolean
    name?: boolean
    content?: boolean
    type?: boolean
    teamMemberId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AssetFileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "content" | "type" | "teamMemberId" | "createdAt" | "updatedAt", ExtArgs["result"]["assetFile"]>
  export type AssetFileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teamMember?: boolean | TeamMemberDefaultArgs<ExtArgs>
  }
  export type AssetFileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teamMember?: boolean | TeamMemberDefaultArgs<ExtArgs>
  }
  export type AssetFileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teamMember?: boolean | TeamMemberDefaultArgs<ExtArgs>
  }

  export type $AssetFilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AssetFile"
    objects: {
      teamMember: Prisma.$TeamMemberPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      content: string
      type: string
      teamMemberId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["assetFile"]>
    composites: {}
  }

  type AssetFileGetPayload<S extends boolean | null | undefined | AssetFileDefaultArgs> = $Result.GetResult<Prisma.$AssetFilePayload, S>

  type AssetFileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssetFileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssetFileCountAggregateInputType | true
    }

  export interface AssetFileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AssetFile'], meta: { name: 'AssetFile' } }
    /**
     * Find zero or one AssetFile that matches the filter.
     * @param {AssetFileFindUniqueArgs} args - Arguments to find a AssetFile
     * @example
     * // Get one AssetFile
     * const assetFile = await prisma.assetFile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssetFileFindUniqueArgs>(args: SelectSubset<T, AssetFileFindUniqueArgs<ExtArgs>>): Prisma__AssetFileClient<$Result.GetResult<Prisma.$AssetFilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AssetFile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssetFileFindUniqueOrThrowArgs} args - Arguments to find a AssetFile
     * @example
     * // Get one AssetFile
     * const assetFile = await prisma.assetFile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssetFileFindUniqueOrThrowArgs>(args: SelectSubset<T, AssetFileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssetFileClient<$Result.GetResult<Prisma.$AssetFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssetFile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFileFindFirstArgs} args - Arguments to find a AssetFile
     * @example
     * // Get one AssetFile
     * const assetFile = await prisma.assetFile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssetFileFindFirstArgs>(args?: SelectSubset<T, AssetFileFindFirstArgs<ExtArgs>>): Prisma__AssetFileClient<$Result.GetResult<Prisma.$AssetFilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssetFile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFileFindFirstOrThrowArgs} args - Arguments to find a AssetFile
     * @example
     * // Get one AssetFile
     * const assetFile = await prisma.assetFile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssetFileFindFirstOrThrowArgs>(args?: SelectSubset<T, AssetFileFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssetFileClient<$Result.GetResult<Prisma.$AssetFilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AssetFiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssetFiles
     * const assetFiles = await prisma.assetFile.findMany()
     * 
     * // Get first 10 AssetFiles
     * const assetFiles = await prisma.assetFile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assetFileWithIdOnly = await prisma.assetFile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssetFileFindManyArgs>(args?: SelectSubset<T, AssetFileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AssetFile.
     * @param {AssetFileCreateArgs} args - Arguments to create a AssetFile.
     * @example
     * // Create one AssetFile
     * const AssetFile = await prisma.assetFile.create({
     *   data: {
     *     // ... data to create a AssetFile
     *   }
     * })
     * 
     */
    create<T extends AssetFileCreateArgs>(args: SelectSubset<T, AssetFileCreateArgs<ExtArgs>>): Prisma__AssetFileClient<$Result.GetResult<Prisma.$AssetFilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AssetFiles.
     * @param {AssetFileCreateManyArgs} args - Arguments to create many AssetFiles.
     * @example
     * // Create many AssetFiles
     * const assetFile = await prisma.assetFile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssetFileCreateManyArgs>(args?: SelectSubset<T, AssetFileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AssetFiles and returns the data saved in the database.
     * @param {AssetFileCreateManyAndReturnArgs} args - Arguments to create many AssetFiles.
     * @example
     * // Create many AssetFiles
     * const assetFile = await prisma.assetFile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AssetFiles and only return the `id`
     * const assetFileWithIdOnly = await prisma.assetFile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssetFileCreateManyAndReturnArgs>(args?: SelectSubset<T, AssetFileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetFilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AssetFile.
     * @param {AssetFileDeleteArgs} args - Arguments to delete one AssetFile.
     * @example
     * // Delete one AssetFile
     * const AssetFile = await prisma.assetFile.delete({
     *   where: {
     *     // ... filter to delete one AssetFile
     *   }
     * })
     * 
     */
    delete<T extends AssetFileDeleteArgs>(args: SelectSubset<T, AssetFileDeleteArgs<ExtArgs>>): Prisma__AssetFileClient<$Result.GetResult<Prisma.$AssetFilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AssetFile.
     * @param {AssetFileUpdateArgs} args - Arguments to update one AssetFile.
     * @example
     * // Update one AssetFile
     * const assetFile = await prisma.assetFile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssetFileUpdateArgs>(args: SelectSubset<T, AssetFileUpdateArgs<ExtArgs>>): Prisma__AssetFileClient<$Result.GetResult<Prisma.$AssetFilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AssetFiles.
     * @param {AssetFileDeleteManyArgs} args - Arguments to filter AssetFiles to delete.
     * @example
     * // Delete a few AssetFiles
     * const { count } = await prisma.assetFile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssetFileDeleteManyArgs>(args?: SelectSubset<T, AssetFileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssetFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssetFiles
     * const assetFile = await prisma.assetFile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssetFileUpdateManyArgs>(args: SelectSubset<T, AssetFileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssetFiles and returns the data updated in the database.
     * @param {AssetFileUpdateManyAndReturnArgs} args - Arguments to update many AssetFiles.
     * @example
     * // Update many AssetFiles
     * const assetFile = await prisma.assetFile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AssetFiles and only return the `id`
     * const assetFileWithIdOnly = await prisma.assetFile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AssetFileUpdateManyAndReturnArgs>(args: SelectSubset<T, AssetFileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetFilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AssetFile.
     * @param {AssetFileUpsertArgs} args - Arguments to update or create a AssetFile.
     * @example
     * // Update or create a AssetFile
     * const assetFile = await prisma.assetFile.upsert({
     *   create: {
     *     // ... data to create a AssetFile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssetFile we want to update
     *   }
     * })
     */
    upsert<T extends AssetFileUpsertArgs>(args: SelectSubset<T, AssetFileUpsertArgs<ExtArgs>>): Prisma__AssetFileClient<$Result.GetResult<Prisma.$AssetFilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AssetFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFileCountArgs} args - Arguments to filter AssetFiles to count.
     * @example
     * // Count the number of AssetFiles
     * const count = await prisma.assetFile.count({
     *   where: {
     *     // ... the filter for the AssetFiles we want to count
     *   }
     * })
    **/
    count<T extends AssetFileCountArgs>(
      args?: Subset<T, AssetFileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssetFileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AssetFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssetFileAggregateArgs>(args: Subset<T, AssetFileAggregateArgs>): Prisma.PrismaPromise<GetAssetFileAggregateType<T>>

    /**
     * Group by AssetFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssetFileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssetFileGroupByArgs['orderBy'] }
        : { orderBy?: AssetFileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssetFileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssetFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AssetFile model
   */
  readonly fields: AssetFileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AssetFile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssetFileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teamMember<T extends TeamMemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamMemberDefaultArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AssetFile model
   */
  interface AssetFileFieldRefs {
    readonly id: FieldRef<"AssetFile", 'String'>
    readonly name: FieldRef<"AssetFile", 'String'>
    readonly content: FieldRef<"AssetFile", 'String'>
    readonly type: FieldRef<"AssetFile", 'String'>
    readonly teamMemberId: FieldRef<"AssetFile", 'String'>
    readonly createdAt: FieldRef<"AssetFile", 'DateTime'>
    readonly updatedAt: FieldRef<"AssetFile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AssetFile findUnique
   */
  export type AssetFileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetFile
     */
    select?: AssetFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetFile
     */
    omit?: AssetFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetFileInclude<ExtArgs> | null
    /**
     * Filter, which AssetFile to fetch.
     */
    where: AssetFileWhereUniqueInput
  }

  /**
   * AssetFile findUniqueOrThrow
   */
  export type AssetFileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetFile
     */
    select?: AssetFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetFile
     */
    omit?: AssetFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetFileInclude<ExtArgs> | null
    /**
     * Filter, which AssetFile to fetch.
     */
    where: AssetFileWhereUniqueInput
  }

  /**
   * AssetFile findFirst
   */
  export type AssetFileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetFile
     */
    select?: AssetFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetFile
     */
    omit?: AssetFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetFileInclude<ExtArgs> | null
    /**
     * Filter, which AssetFile to fetch.
     */
    where?: AssetFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssetFiles to fetch.
     */
    orderBy?: AssetFileOrderByWithRelationInput | AssetFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssetFiles.
     */
    cursor?: AssetFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssetFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssetFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssetFiles.
     */
    distinct?: AssetFileScalarFieldEnum | AssetFileScalarFieldEnum[]
  }

  /**
   * AssetFile findFirstOrThrow
   */
  export type AssetFileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetFile
     */
    select?: AssetFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetFile
     */
    omit?: AssetFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetFileInclude<ExtArgs> | null
    /**
     * Filter, which AssetFile to fetch.
     */
    where?: AssetFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssetFiles to fetch.
     */
    orderBy?: AssetFileOrderByWithRelationInput | AssetFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssetFiles.
     */
    cursor?: AssetFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssetFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssetFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssetFiles.
     */
    distinct?: AssetFileScalarFieldEnum | AssetFileScalarFieldEnum[]
  }

  /**
   * AssetFile findMany
   */
  export type AssetFileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetFile
     */
    select?: AssetFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetFile
     */
    omit?: AssetFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetFileInclude<ExtArgs> | null
    /**
     * Filter, which AssetFiles to fetch.
     */
    where?: AssetFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssetFiles to fetch.
     */
    orderBy?: AssetFileOrderByWithRelationInput | AssetFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AssetFiles.
     */
    cursor?: AssetFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssetFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssetFiles.
     */
    skip?: number
    distinct?: AssetFileScalarFieldEnum | AssetFileScalarFieldEnum[]
  }

  /**
   * AssetFile create
   */
  export type AssetFileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetFile
     */
    select?: AssetFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetFile
     */
    omit?: AssetFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetFileInclude<ExtArgs> | null
    /**
     * The data needed to create a AssetFile.
     */
    data: XOR<AssetFileCreateInput, AssetFileUncheckedCreateInput>
  }

  /**
   * AssetFile createMany
   */
  export type AssetFileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssetFiles.
     */
    data: AssetFileCreateManyInput | AssetFileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssetFile createManyAndReturn
   */
  export type AssetFileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetFile
     */
    select?: AssetFileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssetFile
     */
    omit?: AssetFileOmit<ExtArgs> | null
    /**
     * The data used to create many AssetFiles.
     */
    data: AssetFileCreateManyInput | AssetFileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetFileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AssetFile update
   */
  export type AssetFileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetFile
     */
    select?: AssetFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetFile
     */
    omit?: AssetFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetFileInclude<ExtArgs> | null
    /**
     * The data needed to update a AssetFile.
     */
    data: XOR<AssetFileUpdateInput, AssetFileUncheckedUpdateInput>
    /**
     * Choose, which AssetFile to update.
     */
    where: AssetFileWhereUniqueInput
  }

  /**
   * AssetFile updateMany
   */
  export type AssetFileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AssetFiles.
     */
    data: XOR<AssetFileUpdateManyMutationInput, AssetFileUncheckedUpdateManyInput>
    /**
     * Filter which AssetFiles to update
     */
    where?: AssetFileWhereInput
    /**
     * Limit how many AssetFiles to update.
     */
    limit?: number
  }

  /**
   * AssetFile updateManyAndReturn
   */
  export type AssetFileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetFile
     */
    select?: AssetFileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssetFile
     */
    omit?: AssetFileOmit<ExtArgs> | null
    /**
     * The data used to update AssetFiles.
     */
    data: XOR<AssetFileUpdateManyMutationInput, AssetFileUncheckedUpdateManyInput>
    /**
     * Filter which AssetFiles to update
     */
    where?: AssetFileWhereInput
    /**
     * Limit how many AssetFiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetFileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AssetFile upsert
   */
  export type AssetFileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetFile
     */
    select?: AssetFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetFile
     */
    omit?: AssetFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetFileInclude<ExtArgs> | null
    /**
     * The filter to search for the AssetFile to update in case it exists.
     */
    where: AssetFileWhereUniqueInput
    /**
     * In case the AssetFile found by the `where` argument doesn't exist, create a new AssetFile with this data.
     */
    create: XOR<AssetFileCreateInput, AssetFileUncheckedCreateInput>
    /**
     * In case the AssetFile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssetFileUpdateInput, AssetFileUncheckedUpdateInput>
  }

  /**
   * AssetFile delete
   */
  export type AssetFileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetFile
     */
    select?: AssetFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetFile
     */
    omit?: AssetFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetFileInclude<ExtArgs> | null
    /**
     * Filter which AssetFile to delete.
     */
    where: AssetFileWhereUniqueInput
  }

  /**
   * AssetFile deleteMany
   */
  export type AssetFileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssetFiles to delete
     */
    where?: AssetFileWhereInput
    /**
     * Limit how many AssetFiles to delete.
     */
    limit?: number
  }

  /**
   * AssetFile without action
   */
  export type AssetFileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetFile
     */
    select?: AssetFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssetFile
     */
    omit?: AssetFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetFileInclude<ExtArgs> | null
  }


  /**
   * Model Deal
   */

  export type AggregateDeal = {
    _count: DealCountAggregateOutputType | null
    _avg: DealAvgAggregateOutputType | null
    _sum: DealSumAggregateOutputType | null
    _min: DealMinAggregateOutputType | null
    _max: DealMaxAggregateOutputType | null
  }

  export type DealAvgAggregateOutputType = {
    purchaseAmount: number | null
    financedAmount: number | null
    capRate: number | null
    sqFt: number | null
    arv: number | null
    rehabAmount: number | null
    sortOrder: number | null
  }

  export type DealSumAggregateOutputType = {
    purchaseAmount: number | null
    financedAmount: number | null
    capRate: number | null
    sqFt: number | null
    arv: number | null
    rehabAmount: number | null
    sortOrder: number | null
  }

  export type DealMinAggregateOutputType = {
    id: string | null
    address: string | null
    assetType: $Enums.AssetType | null
    strategy: $Enums.Strategy | null
    purchaseAmount: number | null
    financedAmount: number | null
    stillImageURL: string | null
    generatedVideoURL: string | null
    isPublic: boolean | null
    capRate: number | null
    sqFt: number | null
    firmId: string | null
    teamMemberId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    arv: number | null
    context: string | null
    financingType: string | null
    investmentOverview: string | null
    rehabAmount: number | null
    sortOrder: number | null
  }

  export type DealMaxAggregateOutputType = {
    id: string | null
    address: string | null
    assetType: $Enums.AssetType | null
    strategy: $Enums.Strategy | null
    purchaseAmount: number | null
    financedAmount: number | null
    stillImageURL: string | null
    generatedVideoURL: string | null
    isPublic: boolean | null
    capRate: number | null
    sqFt: number | null
    firmId: string | null
    teamMemberId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    arv: number | null
    context: string | null
    financingType: string | null
    investmentOverview: string | null
    rehabAmount: number | null
    sortOrder: number | null
  }

  export type DealCountAggregateOutputType = {
    id: number
    address: number
    assetType: number
    strategy: number
    purchaseAmount: number
    financedAmount: number
    stillImageURL: number
    generatedVideoURL: number
    isPublic: number
    capRate: number
    sqFt: number
    firmId: number
    teamMemberId: number
    createdAt: number
    updatedAt: number
    arv: number
    context: number
    financingType: number
    images: number
    investmentOverview: number
    rehabAmount: number
    teamMemberIds: number
    sortOrder: number
    _all: number
  }


  export type DealAvgAggregateInputType = {
    purchaseAmount?: true
    financedAmount?: true
    capRate?: true
    sqFt?: true
    arv?: true
    rehabAmount?: true
    sortOrder?: true
  }

  export type DealSumAggregateInputType = {
    purchaseAmount?: true
    financedAmount?: true
    capRate?: true
    sqFt?: true
    arv?: true
    rehabAmount?: true
    sortOrder?: true
  }

  export type DealMinAggregateInputType = {
    id?: true
    address?: true
    assetType?: true
    strategy?: true
    purchaseAmount?: true
    financedAmount?: true
    stillImageURL?: true
    generatedVideoURL?: true
    isPublic?: true
    capRate?: true
    sqFt?: true
    firmId?: true
    teamMemberId?: true
    createdAt?: true
    updatedAt?: true
    arv?: true
    context?: true
    financingType?: true
    investmentOverview?: true
    rehabAmount?: true
    sortOrder?: true
  }

  export type DealMaxAggregateInputType = {
    id?: true
    address?: true
    assetType?: true
    strategy?: true
    purchaseAmount?: true
    financedAmount?: true
    stillImageURL?: true
    generatedVideoURL?: true
    isPublic?: true
    capRate?: true
    sqFt?: true
    firmId?: true
    teamMemberId?: true
    createdAt?: true
    updatedAt?: true
    arv?: true
    context?: true
    financingType?: true
    investmentOverview?: true
    rehabAmount?: true
    sortOrder?: true
  }

  export type DealCountAggregateInputType = {
    id?: true
    address?: true
    assetType?: true
    strategy?: true
    purchaseAmount?: true
    financedAmount?: true
    stillImageURL?: true
    generatedVideoURL?: true
    isPublic?: true
    capRate?: true
    sqFt?: true
    firmId?: true
    teamMemberId?: true
    createdAt?: true
    updatedAt?: true
    arv?: true
    context?: true
    financingType?: true
    images?: true
    investmentOverview?: true
    rehabAmount?: true
    teamMemberIds?: true
    sortOrder?: true
    _all?: true
  }

  export type DealAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Deal to aggregate.
     */
    where?: DealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     */
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Deals
    **/
    _count?: true | DealCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DealAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DealSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DealMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DealMaxAggregateInputType
  }

  export type GetDealAggregateType<T extends DealAggregateArgs> = {
        [P in keyof T & keyof AggregateDeal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeal[P]>
      : GetScalarType<T[P], AggregateDeal[P]>
  }




  export type DealGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DealWhereInput
    orderBy?: DealOrderByWithAggregationInput | DealOrderByWithAggregationInput[]
    by: DealScalarFieldEnum[] | DealScalarFieldEnum
    having?: DealScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DealCountAggregateInputType | true
    _avg?: DealAvgAggregateInputType
    _sum?: DealSumAggregateInputType
    _min?: DealMinAggregateInputType
    _max?: DealMaxAggregateInputType
  }

  export type DealGroupByOutputType = {
    id: string
    address: string
    assetType: $Enums.AssetType
    strategy: $Enums.Strategy
    purchaseAmount: number | null
    financedAmount: number | null
    stillImageURL: string | null
    generatedVideoURL: string | null
    isPublic: boolean
    capRate: number | null
    sqFt: number | null
    firmId: string
    teamMemberId: string | null
    createdAt: Date
    updatedAt: Date
    arv: number | null
    context: string | null
    financingType: string | null
    images: string[]
    investmentOverview: string | null
    rehabAmount: number | null
    teamMemberIds: string[]
    sortOrder: number
    _count: DealCountAggregateOutputType | null
    _avg: DealAvgAggregateOutputType | null
    _sum: DealSumAggregateOutputType | null
    _min: DealMinAggregateOutputType | null
    _max: DealMaxAggregateOutputType | null
  }

  type GetDealGroupByPayload<T extends DealGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DealGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DealGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DealGroupByOutputType[P]>
            : GetScalarType<T[P], DealGroupByOutputType[P]>
        }
      >
    >


  export type DealSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    assetType?: boolean
    strategy?: boolean
    purchaseAmount?: boolean
    financedAmount?: boolean
    stillImageURL?: boolean
    generatedVideoURL?: boolean
    isPublic?: boolean
    capRate?: boolean
    sqFt?: boolean
    firmId?: boolean
    teamMemberId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    arv?: boolean
    context?: boolean
    financingType?: boolean
    images?: boolean
    investmentOverview?: boolean
    rehabAmount?: boolean
    teamMemberIds?: boolean
    sortOrder?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    teamMember?: boolean | Deal$teamMemberArgs<ExtArgs>
  }, ExtArgs["result"]["deal"]>

  export type DealSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    assetType?: boolean
    strategy?: boolean
    purchaseAmount?: boolean
    financedAmount?: boolean
    stillImageURL?: boolean
    generatedVideoURL?: boolean
    isPublic?: boolean
    capRate?: boolean
    sqFt?: boolean
    firmId?: boolean
    teamMemberId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    arv?: boolean
    context?: boolean
    financingType?: boolean
    images?: boolean
    investmentOverview?: boolean
    rehabAmount?: boolean
    teamMemberIds?: boolean
    sortOrder?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    teamMember?: boolean | Deal$teamMemberArgs<ExtArgs>
  }, ExtArgs["result"]["deal"]>

  export type DealSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    assetType?: boolean
    strategy?: boolean
    purchaseAmount?: boolean
    financedAmount?: boolean
    stillImageURL?: boolean
    generatedVideoURL?: boolean
    isPublic?: boolean
    capRate?: boolean
    sqFt?: boolean
    firmId?: boolean
    teamMemberId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    arv?: boolean
    context?: boolean
    financingType?: boolean
    images?: boolean
    investmentOverview?: boolean
    rehabAmount?: boolean
    teamMemberIds?: boolean
    sortOrder?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    teamMember?: boolean | Deal$teamMemberArgs<ExtArgs>
  }, ExtArgs["result"]["deal"]>

  export type DealSelectScalar = {
    id?: boolean
    address?: boolean
    assetType?: boolean
    strategy?: boolean
    purchaseAmount?: boolean
    financedAmount?: boolean
    stillImageURL?: boolean
    generatedVideoURL?: boolean
    isPublic?: boolean
    capRate?: boolean
    sqFt?: boolean
    firmId?: boolean
    teamMemberId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    arv?: boolean
    context?: boolean
    financingType?: boolean
    images?: boolean
    investmentOverview?: boolean
    rehabAmount?: boolean
    teamMemberIds?: boolean
    sortOrder?: boolean
  }

  export type DealOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "address" | "assetType" | "strategy" | "purchaseAmount" | "financedAmount" | "stillImageURL" | "generatedVideoURL" | "isPublic" | "capRate" | "sqFt" | "firmId" | "teamMemberId" | "createdAt" | "updatedAt" | "arv" | "context" | "financingType" | "images" | "investmentOverview" | "rehabAmount" | "teamMemberIds" | "sortOrder", ExtArgs["result"]["deal"]>
  export type DealInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    teamMember?: boolean | Deal$teamMemberArgs<ExtArgs>
  }
  export type DealIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    teamMember?: boolean | Deal$teamMemberArgs<ExtArgs>
  }
  export type DealIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    teamMember?: boolean | Deal$teamMemberArgs<ExtArgs>
  }

  export type $DealPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Deal"
    objects: {
      firm: Prisma.$FirmPayload<ExtArgs>
      teamMember: Prisma.$TeamMemberPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      address: string
      assetType: $Enums.AssetType
      strategy: $Enums.Strategy
      purchaseAmount: number | null
      financedAmount: number | null
      stillImageURL: string | null
      generatedVideoURL: string | null
      isPublic: boolean
      capRate: number | null
      sqFt: number | null
      firmId: string
      teamMemberId: string | null
      createdAt: Date
      updatedAt: Date
      arv: number | null
      context: string | null
      financingType: string | null
      images: string[]
      investmentOverview: string | null
      rehabAmount: number | null
      teamMemberIds: string[]
      sortOrder: number
    }, ExtArgs["result"]["deal"]>
    composites: {}
  }

  type DealGetPayload<S extends boolean | null | undefined | DealDefaultArgs> = $Result.GetResult<Prisma.$DealPayload, S>

  type DealCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DealFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DealCountAggregateInputType | true
    }

  export interface DealDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Deal'], meta: { name: 'Deal' } }
    /**
     * Find zero or one Deal that matches the filter.
     * @param {DealFindUniqueArgs} args - Arguments to find a Deal
     * @example
     * // Get one Deal
     * const deal = await prisma.deal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DealFindUniqueArgs>(args: SelectSubset<T, DealFindUniqueArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Deal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DealFindUniqueOrThrowArgs} args - Arguments to find a Deal
     * @example
     * // Get one Deal
     * const deal = await prisma.deal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DealFindUniqueOrThrowArgs>(args: SelectSubset<T, DealFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Deal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealFindFirstArgs} args - Arguments to find a Deal
     * @example
     * // Get one Deal
     * const deal = await prisma.deal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DealFindFirstArgs>(args?: SelectSubset<T, DealFindFirstArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Deal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealFindFirstOrThrowArgs} args - Arguments to find a Deal
     * @example
     * // Get one Deal
     * const deal = await prisma.deal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DealFindFirstOrThrowArgs>(args?: SelectSubset<T, DealFindFirstOrThrowArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Deals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Deals
     * const deals = await prisma.deal.findMany()
     * 
     * // Get first 10 Deals
     * const deals = await prisma.deal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dealWithIdOnly = await prisma.deal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DealFindManyArgs>(args?: SelectSubset<T, DealFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Deal.
     * @param {DealCreateArgs} args - Arguments to create a Deal.
     * @example
     * // Create one Deal
     * const Deal = await prisma.deal.create({
     *   data: {
     *     // ... data to create a Deal
     *   }
     * })
     * 
     */
    create<T extends DealCreateArgs>(args: SelectSubset<T, DealCreateArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Deals.
     * @param {DealCreateManyArgs} args - Arguments to create many Deals.
     * @example
     * // Create many Deals
     * const deal = await prisma.deal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DealCreateManyArgs>(args?: SelectSubset<T, DealCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Deals and returns the data saved in the database.
     * @param {DealCreateManyAndReturnArgs} args - Arguments to create many Deals.
     * @example
     * // Create many Deals
     * const deal = await prisma.deal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Deals and only return the `id`
     * const dealWithIdOnly = await prisma.deal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DealCreateManyAndReturnArgs>(args?: SelectSubset<T, DealCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Deal.
     * @param {DealDeleteArgs} args - Arguments to delete one Deal.
     * @example
     * // Delete one Deal
     * const Deal = await prisma.deal.delete({
     *   where: {
     *     // ... filter to delete one Deal
     *   }
     * })
     * 
     */
    delete<T extends DealDeleteArgs>(args: SelectSubset<T, DealDeleteArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Deal.
     * @param {DealUpdateArgs} args - Arguments to update one Deal.
     * @example
     * // Update one Deal
     * const deal = await prisma.deal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DealUpdateArgs>(args: SelectSubset<T, DealUpdateArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Deals.
     * @param {DealDeleteManyArgs} args - Arguments to filter Deals to delete.
     * @example
     * // Delete a few Deals
     * const { count } = await prisma.deal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DealDeleteManyArgs>(args?: SelectSubset<T, DealDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Deals
     * const deal = await prisma.deal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DealUpdateManyArgs>(args: SelectSubset<T, DealUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deals and returns the data updated in the database.
     * @param {DealUpdateManyAndReturnArgs} args - Arguments to update many Deals.
     * @example
     * // Update many Deals
     * const deal = await prisma.deal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Deals and only return the `id`
     * const dealWithIdOnly = await prisma.deal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DealUpdateManyAndReturnArgs>(args: SelectSubset<T, DealUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Deal.
     * @param {DealUpsertArgs} args - Arguments to update or create a Deal.
     * @example
     * // Update or create a Deal
     * const deal = await prisma.deal.upsert({
     *   create: {
     *     // ... data to create a Deal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Deal we want to update
     *   }
     * })
     */
    upsert<T extends DealUpsertArgs>(args: SelectSubset<T, DealUpsertArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Deals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealCountArgs} args - Arguments to filter Deals to count.
     * @example
     * // Count the number of Deals
     * const count = await prisma.deal.count({
     *   where: {
     *     // ... the filter for the Deals we want to count
     *   }
     * })
    **/
    count<T extends DealCountArgs>(
      args?: Subset<T, DealCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DealCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Deal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DealAggregateArgs>(args: Subset<T, DealAggregateArgs>): Prisma.PrismaPromise<GetDealAggregateType<T>>

    /**
     * Group by Deal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DealGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DealGroupByArgs['orderBy'] }
        : { orderBy?: DealGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DealGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDealGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Deal model
   */
  readonly fields: DealFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Deal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DealClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    firm<T extends FirmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FirmDefaultArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    teamMember<T extends Deal$teamMemberArgs<ExtArgs> = {}>(args?: Subset<T, Deal$teamMemberArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Deal model
   */
  interface DealFieldRefs {
    readonly id: FieldRef<"Deal", 'String'>
    readonly address: FieldRef<"Deal", 'String'>
    readonly assetType: FieldRef<"Deal", 'AssetType'>
    readonly strategy: FieldRef<"Deal", 'Strategy'>
    readonly purchaseAmount: FieldRef<"Deal", 'Float'>
    readonly financedAmount: FieldRef<"Deal", 'Float'>
    readonly stillImageURL: FieldRef<"Deal", 'String'>
    readonly generatedVideoURL: FieldRef<"Deal", 'String'>
    readonly isPublic: FieldRef<"Deal", 'Boolean'>
    readonly capRate: FieldRef<"Deal", 'Float'>
    readonly sqFt: FieldRef<"Deal", 'Float'>
    readonly firmId: FieldRef<"Deal", 'String'>
    readonly teamMemberId: FieldRef<"Deal", 'String'>
    readonly createdAt: FieldRef<"Deal", 'DateTime'>
    readonly updatedAt: FieldRef<"Deal", 'DateTime'>
    readonly arv: FieldRef<"Deal", 'Float'>
    readonly context: FieldRef<"Deal", 'String'>
    readonly financingType: FieldRef<"Deal", 'String'>
    readonly images: FieldRef<"Deal", 'String[]'>
    readonly investmentOverview: FieldRef<"Deal", 'String'>
    readonly rehabAmount: FieldRef<"Deal", 'Float'>
    readonly teamMemberIds: FieldRef<"Deal", 'String[]'>
    readonly sortOrder: FieldRef<"Deal", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Deal findUnique
   */
  export type DealFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deal to fetch.
     */
    where: DealWhereUniqueInput
  }

  /**
   * Deal findUniqueOrThrow
   */
  export type DealFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deal to fetch.
     */
    where: DealWhereUniqueInput
  }

  /**
   * Deal findFirst
   */
  export type DealFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deal to fetch.
     */
    where?: DealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     */
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deals.
     */
    cursor?: DealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deals.
     */
    distinct?: DealScalarFieldEnum | DealScalarFieldEnum[]
  }

  /**
   * Deal findFirstOrThrow
   */
  export type DealFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deal to fetch.
     */
    where?: DealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     */
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deals.
     */
    cursor?: DealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deals.
     */
    distinct?: DealScalarFieldEnum | DealScalarFieldEnum[]
  }

  /**
   * Deal findMany
   */
  export type DealFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deals to fetch.
     */
    where?: DealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     */
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Deals.
     */
    cursor?: DealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     */
    skip?: number
    distinct?: DealScalarFieldEnum | DealScalarFieldEnum[]
  }

  /**
   * Deal create
   */
  export type DealCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * The data needed to create a Deal.
     */
    data: XOR<DealCreateInput, DealUncheckedCreateInput>
  }

  /**
   * Deal createMany
   */
  export type DealCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Deals.
     */
    data: DealCreateManyInput | DealCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Deal createManyAndReturn
   */
  export type DealCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * The data used to create many Deals.
     */
    data: DealCreateManyInput | DealCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Deal update
   */
  export type DealUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * The data needed to update a Deal.
     */
    data: XOR<DealUpdateInput, DealUncheckedUpdateInput>
    /**
     * Choose, which Deal to update.
     */
    where: DealWhereUniqueInput
  }

  /**
   * Deal updateMany
   */
  export type DealUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Deals.
     */
    data: XOR<DealUpdateManyMutationInput, DealUncheckedUpdateManyInput>
    /**
     * Filter which Deals to update
     */
    where?: DealWhereInput
    /**
     * Limit how many Deals to update.
     */
    limit?: number
  }

  /**
   * Deal updateManyAndReturn
   */
  export type DealUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * The data used to update Deals.
     */
    data: XOR<DealUpdateManyMutationInput, DealUncheckedUpdateManyInput>
    /**
     * Filter which Deals to update
     */
    where?: DealWhereInput
    /**
     * Limit how many Deals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Deal upsert
   */
  export type DealUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * The filter to search for the Deal to update in case it exists.
     */
    where: DealWhereUniqueInput
    /**
     * In case the Deal found by the `where` argument doesn't exist, create a new Deal with this data.
     */
    create: XOR<DealCreateInput, DealUncheckedCreateInput>
    /**
     * In case the Deal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DealUpdateInput, DealUncheckedUpdateInput>
  }

  /**
   * Deal delete
   */
  export type DealDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter which Deal to delete.
     */
    where: DealWhereUniqueInput
  }

  /**
   * Deal deleteMany
   */
  export type DealDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Deals to delete
     */
    where?: DealWhereInput
    /**
     * Limit how many Deals to delete.
     */
    limit?: number
  }

  /**
   * Deal.teamMember
   */
  export type Deal$teamMemberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    where?: TeamMemberWhereInput
  }

  /**
   * Deal without action
   */
  export type DealDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
  }


  /**
   * Model ActivityLog
   */

  export type AggregateActivityLog = {
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  export type ActivityLogMinAggregateOutputType = {
    id: string | null
    type: string | null
    title: string | null
    timestamp: Date | null
    firmId: string | null
    dealId: string | null
    userId: string | null
    memberId: string | null
    performedByEmail: string | null
  }

  export type ActivityLogMaxAggregateOutputType = {
    id: string | null
    type: string | null
    title: string | null
    timestamp: Date | null
    firmId: string | null
    dealId: string | null
    userId: string | null
    memberId: string | null
    performedByEmail: string | null
  }

  export type ActivityLogCountAggregateOutputType = {
    id: number
    type: number
    title: number
    timestamp: number
    firmId: number
    dealId: number
    userId: number
    memberId: number
    performedByEmail: number
    _all: number
  }


  export type ActivityLogMinAggregateInputType = {
    id?: true
    type?: true
    title?: true
    timestamp?: true
    firmId?: true
    dealId?: true
    userId?: true
    memberId?: true
    performedByEmail?: true
  }

  export type ActivityLogMaxAggregateInputType = {
    id?: true
    type?: true
    title?: true
    timestamp?: true
    firmId?: true
    dealId?: true
    userId?: true
    memberId?: true
    performedByEmail?: true
  }

  export type ActivityLogCountAggregateInputType = {
    id?: true
    type?: true
    title?: true
    timestamp?: true
    firmId?: true
    dealId?: true
    userId?: true
    memberId?: true
    performedByEmail?: true
    _all?: true
  }

  export type ActivityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLog to aggregate.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityLogs
    **/
    _count?: true | ActivityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityLogMaxAggregateInputType
  }

  export type GetActivityLogAggregateType<T extends ActivityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityLog[P]>
      : GetScalarType<T[P], AggregateActivityLog[P]>
  }




  export type ActivityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithAggregationInput | ActivityLogOrderByWithAggregationInput[]
    by: ActivityLogScalarFieldEnum[] | ActivityLogScalarFieldEnum
    having?: ActivityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityLogCountAggregateInputType | true
    _min?: ActivityLogMinAggregateInputType
    _max?: ActivityLogMaxAggregateInputType
  }

  export type ActivityLogGroupByOutputType = {
    id: string
    type: string
    title: string
    timestamp: Date
    firmId: string | null
    dealId: string | null
    userId: string | null
    memberId: string | null
    performedByEmail: string | null
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  type GetActivityLogGroupByPayload<T extends ActivityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
        }
      >
    >


  export type ActivityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    title?: boolean
    timestamp?: boolean
    firmId?: boolean
    dealId?: boolean
    userId?: boolean
    memberId?: boolean
    performedByEmail?: boolean
    firm?: boolean | ActivityLog$firmArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    title?: boolean
    timestamp?: boolean
    firmId?: boolean
    dealId?: boolean
    userId?: boolean
    memberId?: boolean
    performedByEmail?: boolean
    firm?: boolean | ActivityLog$firmArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    title?: boolean
    timestamp?: boolean
    firmId?: boolean
    dealId?: boolean
    userId?: boolean
    memberId?: boolean
    performedByEmail?: boolean
    firm?: boolean | ActivityLog$firmArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectScalar = {
    id?: boolean
    type?: boolean
    title?: boolean
    timestamp?: boolean
    firmId?: boolean
    dealId?: boolean
    userId?: boolean
    memberId?: boolean
    performedByEmail?: boolean
  }

  export type ActivityLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "title" | "timestamp" | "firmId" | "dealId" | "userId" | "memberId" | "performedByEmail", ExtArgs["result"]["activityLog"]>
  export type ActivityLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | ActivityLog$firmArgs<ExtArgs>
  }
  export type ActivityLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | ActivityLog$firmArgs<ExtArgs>
  }
  export type ActivityLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | ActivityLog$firmArgs<ExtArgs>
  }

  export type $ActivityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivityLog"
    objects: {
      firm: Prisma.$FirmPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      title: string
      timestamp: Date
      firmId: string | null
      dealId: string | null
      userId: string | null
      memberId: string | null
      performedByEmail: string | null
    }, ExtArgs["result"]["activityLog"]>
    composites: {}
  }

  type ActivityLogGetPayload<S extends boolean | null | undefined | ActivityLogDefaultArgs> = $Result.GetResult<Prisma.$ActivityLogPayload, S>

  type ActivityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityLogCountAggregateInputType | true
    }

  export interface ActivityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivityLog'], meta: { name: 'ActivityLog' } }
    /**
     * Find zero or one ActivityLog that matches the filter.
     * @param {ActivityLogFindUniqueArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityLogFindUniqueArgs>(args: SelectSubset<T, ActivityLogFindUniqueArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActivityLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityLogFindUniqueOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityLogFindFirstArgs>(args?: SelectSubset<T, ActivityLogFindFirstArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActivityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany()
     * 
     * // Get first 10 ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityLogFindManyArgs>(args?: SelectSubset<T, ActivityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActivityLog.
     * @param {ActivityLogCreateArgs} args - Arguments to create a ActivityLog.
     * @example
     * // Create one ActivityLog
     * const ActivityLog = await prisma.activityLog.create({
     *   data: {
     *     // ... data to create a ActivityLog
     *   }
     * })
     * 
     */
    create<T extends ActivityLogCreateArgs>(args: SelectSubset<T, ActivityLogCreateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActivityLogs.
     * @param {ActivityLogCreateManyArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityLogCreateManyArgs>(args?: SelectSubset<T, ActivityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActivityLogs and returns the data saved in the database.
     * @param {ActivityLogCreateManyAndReturnArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActivityLog.
     * @param {ActivityLogDeleteArgs} args - Arguments to delete one ActivityLog.
     * @example
     * // Delete one ActivityLog
     * const ActivityLog = await prisma.activityLog.delete({
     *   where: {
     *     // ... filter to delete one ActivityLog
     *   }
     * })
     * 
     */
    delete<T extends ActivityLogDeleteArgs>(args: SelectSubset<T, ActivityLogDeleteArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActivityLog.
     * @param {ActivityLogUpdateArgs} args - Arguments to update one ActivityLog.
     * @example
     * // Update one ActivityLog
     * const activityLog = await prisma.activityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityLogUpdateArgs>(args: SelectSubset<T, ActivityLogUpdateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActivityLogs.
     * @param {ActivityLogDeleteManyArgs} args - Arguments to filter ActivityLogs to delete.
     * @example
     * // Delete a few ActivityLogs
     * const { count } = await prisma.activityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityLogDeleteManyArgs>(args?: SelectSubset<T, ActivityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityLogUpdateManyArgs>(args: SelectSubset<T, ActivityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs and returns the data updated in the database.
     * @param {ActivityLogUpdateManyAndReturnArgs} args - Arguments to update many ActivityLogs.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActivityLog.
     * @param {ActivityLogUpsertArgs} args - Arguments to update or create a ActivityLog.
     * @example
     * // Update or create a ActivityLog
     * const activityLog = await prisma.activityLog.upsert({
     *   create: {
     *     // ... data to create a ActivityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityLog we want to update
     *   }
     * })
     */
    upsert<T extends ActivityLogUpsertArgs>(args: SelectSubset<T, ActivityLogUpsertArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogCountArgs} args - Arguments to filter ActivityLogs to count.
     * @example
     * // Count the number of ActivityLogs
     * const count = await prisma.activityLog.count({
     *   where: {
     *     // ... the filter for the ActivityLogs we want to count
     *   }
     * })
    **/
    count<T extends ActivityLogCountArgs>(
      args?: Subset<T, ActivityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityLogAggregateArgs>(args: Subset<T, ActivityLogAggregateArgs>): Prisma.PrismaPromise<GetActivityLogAggregateType<T>>

    /**
     * Group by ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityLogGroupByArgs['orderBy'] }
        : { orderBy?: ActivityLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivityLog model
   */
  readonly fields: ActivityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    firm<T extends ActivityLog$firmArgs<ExtArgs> = {}>(args?: Subset<T, ActivityLog$firmArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActivityLog model
   */
  interface ActivityLogFieldRefs {
    readonly id: FieldRef<"ActivityLog", 'String'>
    readonly type: FieldRef<"ActivityLog", 'String'>
    readonly title: FieldRef<"ActivityLog", 'String'>
    readonly timestamp: FieldRef<"ActivityLog", 'DateTime'>
    readonly firmId: FieldRef<"ActivityLog", 'String'>
    readonly dealId: FieldRef<"ActivityLog", 'String'>
    readonly userId: FieldRef<"ActivityLog", 'String'>
    readonly memberId: FieldRef<"ActivityLog", 'String'>
    readonly performedByEmail: FieldRef<"ActivityLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ActivityLog findUnique
   */
  export type ActivityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findUniqueOrThrow
   */
  export type ActivityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findFirst
   */
  export type ActivityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findFirstOrThrow
   */
  export type ActivityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findMany
   */
  export type ActivityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLogs to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog create
   */
  export type ActivityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ActivityLog.
     */
    data: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
  }

  /**
   * ActivityLog createMany
   */
  export type ActivityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivityLog createManyAndReturn
   */
  export type ActivityLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityLog update
   */
  export type ActivityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ActivityLog.
     */
    data: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
    /**
     * Choose, which ActivityLog to update.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog updateMany
   */
  export type ActivityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
  }

  /**
   * ActivityLog updateManyAndReturn
   */
  export type ActivityLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityLog upsert
   */
  export type ActivityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ActivityLog to update in case it exists.
     */
    where: ActivityLogWhereUniqueInput
    /**
     * In case the ActivityLog found by the `where` argument doesn't exist, create a new ActivityLog with this data.
     */
    create: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
    /**
     * In case the ActivityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
  }

  /**
   * ActivityLog delete
   */
  export type ActivityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter which ActivityLog to delete.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog deleteMany
   */
  export type ActivityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLogs to delete
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to delete.
     */
    limit?: number
  }

  /**
   * ActivityLog.firm
   */
  export type ActivityLog$firmArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
    where?: FirmWhereInput
  }

  /**
   * ActivityLog without action
   */
  export type ActivityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: string | null
    priority: string | null
    assigneeId: string | null
    dueDate: Date | null
    firmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: string | null
    priority: string | null
    assigneeId: string | null
    dueDate: Date | null
    firmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    title: number
    description: number
    status: number
    priority: number
    assigneeId: number
    dueDate: number
    firmId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    assigneeId?: true
    dueDate?: true
    firmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    assigneeId?: true
    dueDate?: true
    firmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    assigneeId?: true
    dueDate?: true
    firmId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    title: string
    description: string | null
    status: string
    priority: string
    assigneeId: string | null
    dueDate: Date | null
    firmId: string
    createdAt: Date
    updatedAt: Date
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    assigneeId?: boolean
    dueDate?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    assignee?: boolean | Task$assigneeArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    assigneeId?: boolean
    dueDate?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    assignee?: boolean | Task$assigneeArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    assigneeId?: boolean
    dueDate?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    assignee?: boolean | Task$assigneeArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    assigneeId?: boolean
    dueDate?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "status" | "priority" | "assigneeId" | "dueDate" | "firmId" | "createdAt" | "updatedAt", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    assignee?: boolean | Task$assigneeArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    assignee?: boolean | Task$assigneeArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    assignee?: boolean | Task$assigneeArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      firm: Prisma.$FirmPayload<ExtArgs>
      assignee: Prisma.$TeamMemberPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      status: string
      priority: string
      assigneeId: string | null
      dueDate: Date | null
      firmId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    firm<T extends FirmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FirmDefaultArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assignee<T extends Task$assigneeArgs<ExtArgs> = {}>(args?: Subset<T, Task$assigneeArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly title: FieldRef<"Task", 'String'>
    readonly description: FieldRef<"Task", 'String'>
    readonly status: FieldRef<"Task", 'String'>
    readonly priority: FieldRef<"Task", 'String'>
    readonly assigneeId: FieldRef<"Task", 'String'>
    readonly dueDate: FieldRef<"Task", 'DateTime'>
    readonly firmId: FieldRef<"Task", 'String'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.assignee
   */
  export type Task$assigneeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    where?: TeamMemberWhereInput
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const FirmScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    logoUrl: 'logoUrl',
    primaryColor: 'primaryColor',
    physicalAddress: 'physicalAddress',
    linkedInUrl: 'linkedInUrl',
    googleReviewsUrl: 'googleReviewsUrl',
    bio: 'bio',
    heroMediaUrl: 'heroMediaUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    accentColor: 'accentColor',
    backgroundColor: 'backgroundColor',
    fontColor: 'fontColor',
    showAgencyBranding: 'showAgencyBranding',
    logoScale: 'logoScale',
    borderRadius: 'borderRadius',
    bioFontFamily: 'bioFontFamily',
    bioFontSize: 'bioFontSize',
    firmNameFontFamily: 'firmNameFontFamily',
    firmNameFontSize: 'firmNameFontSize',
    firmNameFontWeight: 'firmNameFontWeight',
    isColorLinked: 'isColorLinked',
    isFontLinked: 'isFontLinked',
    bioFontColor: 'bioFontColor',
    firmNameFontColor: 'firmNameFontColor',
    memberCardBgColor: 'memberCardBgColor',
    memberPhotoSpacing: 'memberPhotoSpacing',
    showMemberNarrative: 'showMemberNarrative',
    isMemberCardColorLinked: 'isMemberCardColorLinked',
    cardShadowIntensity: 'cardShadowIntensity',
    portfolioListStyle: 'portfolioListStyle',
    showSearchBar: 'showSearchBar',
    teamListStyle: 'teamListStyle',
    viewLayoutMode: 'viewLayoutMode',
    tombstoneInfoBgColor: 'tombstoneInfoBgColor',
    tombstoneLayout: 'tombstoneLayout',
    tombstoneMaxWidth: 'tombstoneMaxWidth',
    tombstoneMediaBgColor: 'tombstoneMediaBgColor',
    tombstoneMetricsBgColor: 'tombstoneMetricsBgColor',
    tombstoneNarrativeBgColor: 'tombstoneNarrativeBgColor',
    tombstonePadding: 'tombstonePadding'
  };

  export type FirmScalarFieldEnum = (typeof FirmScalarFieldEnum)[keyof typeof FirmScalarFieldEnum]


  export const InvitationScalarFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token',
    role: 'role',
    firmId: 'firmId',
    isUsed: 'isUsed',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
  };

  export type InvitationScalarFieldEnum = (typeof InvitationScalarFieldEnum)[keyof typeof InvitationScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    role: 'role',
    firmId: 'firmId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name',
    resetToken: 'resetToken',
    resetTokenExpires: 'resetTokenExpires'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TeamMemberScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    role: 'role',
    email: 'email',
    imageURL: 'imageURL',
    firmId: 'firmId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    bio: 'bio',
    firmIds: 'firmIds',
    heroMediaUrl: 'heroMediaUrl',
    linkedInUrl: 'linkedInUrl',
    phoneNumber: 'phoneNumber',
    sortOrder: 'sortOrder',
    userId: 'userId',
    department: 'department',
    managerId: 'managerId'
  };

  export type TeamMemberScalarFieldEnum = (typeof TeamMemberScalarFieldEnum)[keyof typeof TeamMemberScalarFieldEnum]


  export const AssetFileScalarFieldEnum: {
    id: 'id',
    name: 'name',
    content: 'content',
    type: 'type',
    teamMemberId: 'teamMemberId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AssetFileScalarFieldEnum = (typeof AssetFileScalarFieldEnum)[keyof typeof AssetFileScalarFieldEnum]


  export const DealScalarFieldEnum: {
    id: 'id',
    address: 'address',
    assetType: 'assetType',
    strategy: 'strategy',
    purchaseAmount: 'purchaseAmount',
    financedAmount: 'financedAmount',
    stillImageURL: 'stillImageURL',
    generatedVideoURL: 'generatedVideoURL',
    isPublic: 'isPublic',
    capRate: 'capRate',
    sqFt: 'sqFt',
    firmId: 'firmId',
    teamMemberId: 'teamMemberId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    arv: 'arv',
    context: 'context',
    financingType: 'financingType',
    images: 'images',
    investmentOverview: 'investmentOverview',
    rehabAmount: 'rehabAmount',
    teamMemberIds: 'teamMemberIds',
    sortOrder: 'sortOrder'
  };

  export type DealScalarFieldEnum = (typeof DealScalarFieldEnum)[keyof typeof DealScalarFieldEnum]


  export const ActivityLogScalarFieldEnum: {
    id: 'id',
    type: 'type',
    title: 'title',
    timestamp: 'timestamp',
    firmId: 'firmId',
    dealId: 'dealId',
    userId: 'userId',
    memberId: 'memberId',
    performedByEmail: 'performedByEmail'
  };

  export type ActivityLogScalarFieldEnum = (typeof ActivityLogScalarFieldEnum)[keyof typeof ActivityLogScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    status: 'status',
    priority: 'priority',
    assigneeId: 'assigneeId',
    dueDate: 'dueDate',
    firmId: 'firmId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'AssetType'
   */
  export type EnumAssetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetType'>
    


  /**
   * Reference to a field of type 'AssetType[]'
   */
  export type ListEnumAssetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssetType[]'>
    


  /**
   * Reference to a field of type 'Strategy'
   */
  export type EnumStrategyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Strategy'>
    


  /**
   * Reference to a field of type 'Strategy[]'
   */
  export type ListEnumStrategyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Strategy[]'>
    
  /**
   * Deep Input Types
   */


  export type FirmWhereInput = {
    AND?: FirmWhereInput | FirmWhereInput[]
    OR?: FirmWhereInput[]
    NOT?: FirmWhereInput | FirmWhereInput[]
    id?: StringFilter<"Firm"> | string
    name?: StringFilter<"Firm"> | string
    slug?: StringFilter<"Firm"> | string
    logoUrl?: StringNullableFilter<"Firm"> | string | null
    primaryColor?: StringNullableFilter<"Firm"> | string | null
    physicalAddress?: StringNullableFilter<"Firm"> | string | null
    linkedInUrl?: StringNullableFilter<"Firm"> | string | null
    googleReviewsUrl?: StringNullableFilter<"Firm"> | string | null
    bio?: StringNullableFilter<"Firm"> | string | null
    heroMediaUrl?: StringNullableFilter<"Firm"> | string | null
    createdAt?: DateTimeFilter<"Firm"> | Date | string
    updatedAt?: DateTimeFilter<"Firm"> | Date | string
    accentColor?: StringNullableFilter<"Firm"> | string | null
    backgroundColor?: StringNullableFilter<"Firm"> | string | null
    fontColor?: StringNullableFilter<"Firm"> | string | null
    showAgencyBranding?: BoolFilter<"Firm"> | boolean
    logoScale?: FloatFilter<"Firm"> | number
    borderRadius?: StringFilter<"Firm"> | string
    bioFontFamily?: StringFilter<"Firm"> | string
    bioFontSize?: IntFilter<"Firm"> | number
    firmNameFontFamily?: StringFilter<"Firm"> | string
    firmNameFontSize?: IntFilter<"Firm"> | number
    firmNameFontWeight?: StringFilter<"Firm"> | string
    isColorLinked?: BoolFilter<"Firm"> | boolean
    isFontLinked?: BoolFilter<"Firm"> | boolean
    bioFontColor?: StringFilter<"Firm"> | string
    firmNameFontColor?: StringFilter<"Firm"> | string
    memberCardBgColor?: StringFilter<"Firm"> | string
    memberPhotoSpacing?: IntFilter<"Firm"> | number
    showMemberNarrative?: BoolFilter<"Firm"> | boolean
    isMemberCardColorLinked?: BoolFilter<"Firm"> | boolean
    cardShadowIntensity?: FloatFilter<"Firm"> | number
    portfolioListStyle?: StringFilter<"Firm"> | string
    showSearchBar?: BoolFilter<"Firm"> | boolean
    teamListStyle?: StringFilter<"Firm"> | string
    viewLayoutMode?: StringFilter<"Firm"> | string
    tombstoneInfoBgColor?: StringNullableFilter<"Firm"> | string | null
    tombstoneLayout?: StringNullableListFilter<"Firm">
    tombstoneMaxWidth?: IntFilter<"Firm"> | number
    tombstoneMediaBgColor?: StringNullableFilter<"Firm"> | string | null
    tombstoneMetricsBgColor?: StringNullableFilter<"Firm"> | string | null
    tombstoneNarrativeBgColor?: StringNullableFilter<"Firm"> | string | null
    tombstonePadding?: IntFilter<"Firm"> | number
    activityLogs?: ActivityLogListRelationFilter
    deals?: DealListRelationFilter
    invitations?: InvitationListRelationFilter
    teamMembers?: TeamMemberListRelationFilter
    users?: UserListRelationFilter
    tasks?: TaskListRelationFilter
  }

  export type FirmOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    primaryColor?: SortOrderInput | SortOrder
    physicalAddress?: SortOrderInput | SortOrder
    linkedInUrl?: SortOrderInput | SortOrder
    googleReviewsUrl?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    heroMediaUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accentColor?: SortOrderInput | SortOrder
    backgroundColor?: SortOrderInput | SortOrder
    fontColor?: SortOrderInput | SortOrder
    showAgencyBranding?: SortOrder
    logoScale?: SortOrder
    borderRadius?: SortOrder
    bioFontFamily?: SortOrder
    bioFontSize?: SortOrder
    firmNameFontFamily?: SortOrder
    firmNameFontSize?: SortOrder
    firmNameFontWeight?: SortOrder
    isColorLinked?: SortOrder
    isFontLinked?: SortOrder
    bioFontColor?: SortOrder
    firmNameFontColor?: SortOrder
    memberCardBgColor?: SortOrder
    memberPhotoSpacing?: SortOrder
    showMemberNarrative?: SortOrder
    isMemberCardColorLinked?: SortOrder
    cardShadowIntensity?: SortOrder
    portfolioListStyle?: SortOrder
    showSearchBar?: SortOrder
    teamListStyle?: SortOrder
    viewLayoutMode?: SortOrder
    tombstoneInfoBgColor?: SortOrderInput | SortOrder
    tombstoneLayout?: SortOrder
    tombstoneMaxWidth?: SortOrder
    tombstoneMediaBgColor?: SortOrderInput | SortOrder
    tombstoneMetricsBgColor?: SortOrderInput | SortOrder
    tombstoneNarrativeBgColor?: SortOrderInput | SortOrder
    tombstonePadding?: SortOrder
    activityLogs?: ActivityLogOrderByRelationAggregateInput
    deals?: DealOrderByRelationAggregateInput
    invitations?: InvitationOrderByRelationAggregateInput
    teamMembers?: TeamMemberOrderByRelationAggregateInput
    users?: UserOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
  }

  export type FirmWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: FirmWhereInput | FirmWhereInput[]
    OR?: FirmWhereInput[]
    NOT?: FirmWhereInput | FirmWhereInput[]
    name?: StringFilter<"Firm"> | string
    logoUrl?: StringNullableFilter<"Firm"> | string | null
    primaryColor?: StringNullableFilter<"Firm"> | string | null
    physicalAddress?: StringNullableFilter<"Firm"> | string | null
    linkedInUrl?: StringNullableFilter<"Firm"> | string | null
    googleReviewsUrl?: StringNullableFilter<"Firm"> | string | null
    bio?: StringNullableFilter<"Firm"> | string | null
    heroMediaUrl?: StringNullableFilter<"Firm"> | string | null
    createdAt?: DateTimeFilter<"Firm"> | Date | string
    updatedAt?: DateTimeFilter<"Firm"> | Date | string
    accentColor?: StringNullableFilter<"Firm"> | string | null
    backgroundColor?: StringNullableFilter<"Firm"> | string | null
    fontColor?: StringNullableFilter<"Firm"> | string | null
    showAgencyBranding?: BoolFilter<"Firm"> | boolean
    logoScale?: FloatFilter<"Firm"> | number
    borderRadius?: StringFilter<"Firm"> | string
    bioFontFamily?: StringFilter<"Firm"> | string
    bioFontSize?: IntFilter<"Firm"> | number
    firmNameFontFamily?: StringFilter<"Firm"> | string
    firmNameFontSize?: IntFilter<"Firm"> | number
    firmNameFontWeight?: StringFilter<"Firm"> | string
    isColorLinked?: BoolFilter<"Firm"> | boolean
    isFontLinked?: BoolFilter<"Firm"> | boolean
    bioFontColor?: StringFilter<"Firm"> | string
    firmNameFontColor?: StringFilter<"Firm"> | string
    memberCardBgColor?: StringFilter<"Firm"> | string
    memberPhotoSpacing?: IntFilter<"Firm"> | number
    showMemberNarrative?: BoolFilter<"Firm"> | boolean
    isMemberCardColorLinked?: BoolFilter<"Firm"> | boolean
    cardShadowIntensity?: FloatFilter<"Firm"> | number
    portfolioListStyle?: StringFilter<"Firm"> | string
    showSearchBar?: BoolFilter<"Firm"> | boolean
    teamListStyle?: StringFilter<"Firm"> | string
    viewLayoutMode?: StringFilter<"Firm"> | string
    tombstoneInfoBgColor?: StringNullableFilter<"Firm"> | string | null
    tombstoneLayout?: StringNullableListFilter<"Firm">
    tombstoneMaxWidth?: IntFilter<"Firm"> | number
    tombstoneMediaBgColor?: StringNullableFilter<"Firm"> | string | null
    tombstoneMetricsBgColor?: StringNullableFilter<"Firm"> | string | null
    tombstoneNarrativeBgColor?: StringNullableFilter<"Firm"> | string | null
    tombstonePadding?: IntFilter<"Firm"> | number
    activityLogs?: ActivityLogListRelationFilter
    deals?: DealListRelationFilter
    invitations?: InvitationListRelationFilter
    teamMembers?: TeamMemberListRelationFilter
    users?: UserListRelationFilter
    tasks?: TaskListRelationFilter
  }, "id" | "slug">

  export type FirmOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    primaryColor?: SortOrderInput | SortOrder
    physicalAddress?: SortOrderInput | SortOrder
    linkedInUrl?: SortOrderInput | SortOrder
    googleReviewsUrl?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    heroMediaUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accentColor?: SortOrderInput | SortOrder
    backgroundColor?: SortOrderInput | SortOrder
    fontColor?: SortOrderInput | SortOrder
    showAgencyBranding?: SortOrder
    logoScale?: SortOrder
    borderRadius?: SortOrder
    bioFontFamily?: SortOrder
    bioFontSize?: SortOrder
    firmNameFontFamily?: SortOrder
    firmNameFontSize?: SortOrder
    firmNameFontWeight?: SortOrder
    isColorLinked?: SortOrder
    isFontLinked?: SortOrder
    bioFontColor?: SortOrder
    firmNameFontColor?: SortOrder
    memberCardBgColor?: SortOrder
    memberPhotoSpacing?: SortOrder
    showMemberNarrative?: SortOrder
    isMemberCardColorLinked?: SortOrder
    cardShadowIntensity?: SortOrder
    portfolioListStyle?: SortOrder
    showSearchBar?: SortOrder
    teamListStyle?: SortOrder
    viewLayoutMode?: SortOrder
    tombstoneInfoBgColor?: SortOrderInput | SortOrder
    tombstoneLayout?: SortOrder
    tombstoneMaxWidth?: SortOrder
    tombstoneMediaBgColor?: SortOrderInput | SortOrder
    tombstoneMetricsBgColor?: SortOrderInput | SortOrder
    tombstoneNarrativeBgColor?: SortOrderInput | SortOrder
    tombstonePadding?: SortOrder
    _count?: FirmCountOrderByAggregateInput
    _avg?: FirmAvgOrderByAggregateInput
    _max?: FirmMaxOrderByAggregateInput
    _min?: FirmMinOrderByAggregateInput
    _sum?: FirmSumOrderByAggregateInput
  }

  export type FirmScalarWhereWithAggregatesInput = {
    AND?: FirmScalarWhereWithAggregatesInput | FirmScalarWhereWithAggregatesInput[]
    OR?: FirmScalarWhereWithAggregatesInput[]
    NOT?: FirmScalarWhereWithAggregatesInput | FirmScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Firm"> | string
    name?: StringWithAggregatesFilter<"Firm"> | string
    slug?: StringWithAggregatesFilter<"Firm"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"Firm"> | string | null
    primaryColor?: StringNullableWithAggregatesFilter<"Firm"> | string | null
    physicalAddress?: StringNullableWithAggregatesFilter<"Firm"> | string | null
    linkedInUrl?: StringNullableWithAggregatesFilter<"Firm"> | string | null
    googleReviewsUrl?: StringNullableWithAggregatesFilter<"Firm"> | string | null
    bio?: StringNullableWithAggregatesFilter<"Firm"> | string | null
    heroMediaUrl?: StringNullableWithAggregatesFilter<"Firm"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Firm"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Firm"> | Date | string
    accentColor?: StringNullableWithAggregatesFilter<"Firm"> | string | null
    backgroundColor?: StringNullableWithAggregatesFilter<"Firm"> | string | null
    fontColor?: StringNullableWithAggregatesFilter<"Firm"> | string | null
    showAgencyBranding?: BoolWithAggregatesFilter<"Firm"> | boolean
    logoScale?: FloatWithAggregatesFilter<"Firm"> | number
    borderRadius?: StringWithAggregatesFilter<"Firm"> | string
    bioFontFamily?: StringWithAggregatesFilter<"Firm"> | string
    bioFontSize?: IntWithAggregatesFilter<"Firm"> | number
    firmNameFontFamily?: StringWithAggregatesFilter<"Firm"> | string
    firmNameFontSize?: IntWithAggregatesFilter<"Firm"> | number
    firmNameFontWeight?: StringWithAggregatesFilter<"Firm"> | string
    isColorLinked?: BoolWithAggregatesFilter<"Firm"> | boolean
    isFontLinked?: BoolWithAggregatesFilter<"Firm"> | boolean
    bioFontColor?: StringWithAggregatesFilter<"Firm"> | string
    firmNameFontColor?: StringWithAggregatesFilter<"Firm"> | string
    memberCardBgColor?: StringWithAggregatesFilter<"Firm"> | string
    memberPhotoSpacing?: IntWithAggregatesFilter<"Firm"> | number
    showMemberNarrative?: BoolWithAggregatesFilter<"Firm"> | boolean
    isMemberCardColorLinked?: BoolWithAggregatesFilter<"Firm"> | boolean
    cardShadowIntensity?: FloatWithAggregatesFilter<"Firm"> | number
    portfolioListStyle?: StringWithAggregatesFilter<"Firm"> | string
    showSearchBar?: BoolWithAggregatesFilter<"Firm"> | boolean
    teamListStyle?: StringWithAggregatesFilter<"Firm"> | string
    viewLayoutMode?: StringWithAggregatesFilter<"Firm"> | string
    tombstoneInfoBgColor?: StringNullableWithAggregatesFilter<"Firm"> | string | null
    tombstoneLayout?: StringNullableListFilter<"Firm">
    tombstoneMaxWidth?: IntWithAggregatesFilter<"Firm"> | number
    tombstoneMediaBgColor?: StringNullableWithAggregatesFilter<"Firm"> | string | null
    tombstoneMetricsBgColor?: StringNullableWithAggregatesFilter<"Firm"> | string | null
    tombstoneNarrativeBgColor?: StringNullableWithAggregatesFilter<"Firm"> | string | null
    tombstonePadding?: IntWithAggregatesFilter<"Firm"> | number
  }

  export type InvitationWhereInput = {
    AND?: InvitationWhereInput | InvitationWhereInput[]
    OR?: InvitationWhereInput[]
    NOT?: InvitationWhereInput | InvitationWhereInput[]
    id?: StringFilter<"Invitation"> | string
    email?: StringFilter<"Invitation"> | string
    token?: StringFilter<"Invitation"> | string
    role?: EnumUserRoleFilter<"Invitation"> | $Enums.UserRole
    firmId?: StringFilter<"Invitation"> | string
    isUsed?: BoolFilter<"Invitation"> | boolean
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
    expiresAt?: DateTimeFilter<"Invitation"> | Date | string
    firm?: XOR<FirmScalarRelationFilter, FirmWhereInput>
  }

  export type InvitationOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    role?: SortOrder
    firmId?: SortOrder
    isUsed?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    firm?: FirmOrderByWithRelationInput
  }

  export type InvitationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: InvitationWhereInput | InvitationWhereInput[]
    OR?: InvitationWhereInput[]
    NOT?: InvitationWhereInput | InvitationWhereInput[]
    email?: StringFilter<"Invitation"> | string
    role?: EnumUserRoleFilter<"Invitation"> | $Enums.UserRole
    firmId?: StringFilter<"Invitation"> | string
    isUsed?: BoolFilter<"Invitation"> | boolean
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
    expiresAt?: DateTimeFilter<"Invitation"> | Date | string
    firm?: XOR<FirmScalarRelationFilter, FirmWhereInput>
  }, "id" | "token">

  export type InvitationOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    role?: SortOrder
    firmId?: SortOrder
    isUsed?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    _count?: InvitationCountOrderByAggregateInput
    _max?: InvitationMaxOrderByAggregateInput
    _min?: InvitationMinOrderByAggregateInput
  }

  export type InvitationScalarWhereWithAggregatesInput = {
    AND?: InvitationScalarWhereWithAggregatesInput | InvitationScalarWhereWithAggregatesInput[]
    OR?: InvitationScalarWhereWithAggregatesInput[]
    NOT?: InvitationScalarWhereWithAggregatesInput | InvitationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Invitation"> | string
    email?: StringWithAggregatesFilter<"Invitation"> | string
    token?: StringWithAggregatesFilter<"Invitation"> | string
    role?: EnumUserRoleWithAggregatesFilter<"Invitation"> | $Enums.UserRole
    firmId?: StringWithAggregatesFilter<"Invitation"> | string
    isUsed?: BoolWithAggregatesFilter<"Invitation"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Invitation"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"Invitation"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    firmId?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    name?: StringNullableFilter<"User"> | string | null
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    professionalProfile?: XOR<TeamMemberNullableScalarRelationFilter, TeamMemberWhereInput> | null
    firm?: XOR<FirmScalarRelationFilter, FirmWhereInput>
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrderInput | SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpires?: SortOrderInput | SortOrder
    professionalProfile?: TeamMemberOrderByWithRelationInput
    firm?: FirmOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    resetToken?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    firmId?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    name?: StringNullableFilter<"User"> | string | null
    resetTokenExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    professionalProfile?: XOR<TeamMemberNullableScalarRelationFilter, TeamMemberWhereInput> | null
    firm?: XOR<FirmScalarRelationFilter, FirmWhereInput>
  }, "id" | "email" | "resetToken">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrderInput | SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpires?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    firmId?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetTokenExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type TeamMemberWhereInput = {
    AND?: TeamMemberWhereInput | TeamMemberWhereInput[]
    OR?: TeamMemberWhereInput[]
    NOT?: TeamMemberWhereInput | TeamMemberWhereInput[]
    id?: StringFilter<"TeamMember"> | string
    name?: StringFilter<"TeamMember"> | string
    slug?: StringFilter<"TeamMember"> | string
    role?: StringFilter<"TeamMember"> | string
    email?: StringNullableFilter<"TeamMember"> | string | null
    imageURL?: StringNullableFilter<"TeamMember"> | string | null
    firmId?: StringFilter<"TeamMember"> | string
    createdAt?: DateTimeFilter<"TeamMember"> | Date | string
    updatedAt?: DateTimeFilter<"TeamMember"> | Date | string
    bio?: StringNullableFilter<"TeamMember"> | string | null
    firmIds?: StringNullableListFilter<"TeamMember">
    heroMediaUrl?: StringNullableFilter<"TeamMember"> | string | null
    linkedInUrl?: StringNullableFilter<"TeamMember"> | string | null
    phoneNumber?: StringNullableFilter<"TeamMember"> | string | null
    sortOrder?: IntFilter<"TeamMember"> | number
    userId?: StringNullableFilter<"TeamMember"> | string | null
    department?: StringNullableFilter<"TeamMember"> | string | null
    managerId?: StringNullableFilter<"TeamMember"> | string | null
    manager?: XOR<TeamMemberNullableScalarRelationFilter, TeamMemberWhereInput> | null
    reports?: TeamMemberListRelationFilter
    deals?: DealListRelationFilter
    tasks?: TaskListRelationFilter
    firm?: XOR<FirmScalarRelationFilter, FirmWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    files?: AssetFileListRelationFilter
  }

  export type TeamMemberOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    role?: SortOrder
    email?: SortOrderInput | SortOrder
    imageURL?: SortOrderInput | SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bio?: SortOrderInput | SortOrder
    firmIds?: SortOrder
    heroMediaUrl?: SortOrderInput | SortOrder
    linkedInUrl?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    userId?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    managerId?: SortOrderInput | SortOrder
    manager?: TeamMemberOrderByWithRelationInput
    reports?: TeamMemberOrderByRelationAggregateInput
    deals?: DealOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
    firm?: FirmOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    files?: AssetFileOrderByRelationAggregateInput
  }

  export type TeamMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    email?: string
    userId?: string
    AND?: TeamMemberWhereInput | TeamMemberWhereInput[]
    OR?: TeamMemberWhereInput[]
    NOT?: TeamMemberWhereInput | TeamMemberWhereInput[]
    name?: StringFilter<"TeamMember"> | string
    role?: StringFilter<"TeamMember"> | string
    imageURL?: StringNullableFilter<"TeamMember"> | string | null
    firmId?: StringFilter<"TeamMember"> | string
    createdAt?: DateTimeFilter<"TeamMember"> | Date | string
    updatedAt?: DateTimeFilter<"TeamMember"> | Date | string
    bio?: StringNullableFilter<"TeamMember"> | string | null
    firmIds?: StringNullableListFilter<"TeamMember">
    heroMediaUrl?: StringNullableFilter<"TeamMember"> | string | null
    linkedInUrl?: StringNullableFilter<"TeamMember"> | string | null
    phoneNumber?: StringNullableFilter<"TeamMember"> | string | null
    sortOrder?: IntFilter<"TeamMember"> | number
    department?: StringNullableFilter<"TeamMember"> | string | null
    managerId?: StringNullableFilter<"TeamMember"> | string | null
    manager?: XOR<TeamMemberNullableScalarRelationFilter, TeamMemberWhereInput> | null
    reports?: TeamMemberListRelationFilter
    deals?: DealListRelationFilter
    tasks?: TaskListRelationFilter
    firm?: XOR<FirmScalarRelationFilter, FirmWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    files?: AssetFileListRelationFilter
  }, "id" | "slug" | "email" | "userId">

  export type TeamMemberOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    role?: SortOrder
    email?: SortOrderInput | SortOrder
    imageURL?: SortOrderInput | SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bio?: SortOrderInput | SortOrder
    firmIds?: SortOrder
    heroMediaUrl?: SortOrderInput | SortOrder
    linkedInUrl?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    userId?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    managerId?: SortOrderInput | SortOrder
    _count?: TeamMemberCountOrderByAggregateInput
    _avg?: TeamMemberAvgOrderByAggregateInput
    _max?: TeamMemberMaxOrderByAggregateInput
    _min?: TeamMemberMinOrderByAggregateInput
    _sum?: TeamMemberSumOrderByAggregateInput
  }

  export type TeamMemberScalarWhereWithAggregatesInput = {
    AND?: TeamMemberScalarWhereWithAggregatesInput | TeamMemberScalarWhereWithAggregatesInput[]
    OR?: TeamMemberScalarWhereWithAggregatesInput[]
    NOT?: TeamMemberScalarWhereWithAggregatesInput | TeamMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TeamMember"> | string
    name?: StringWithAggregatesFilter<"TeamMember"> | string
    slug?: StringWithAggregatesFilter<"TeamMember"> | string
    role?: StringWithAggregatesFilter<"TeamMember"> | string
    email?: StringNullableWithAggregatesFilter<"TeamMember"> | string | null
    imageURL?: StringNullableWithAggregatesFilter<"TeamMember"> | string | null
    firmId?: StringWithAggregatesFilter<"TeamMember"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TeamMember"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TeamMember"> | Date | string
    bio?: StringNullableWithAggregatesFilter<"TeamMember"> | string | null
    firmIds?: StringNullableListFilter<"TeamMember">
    heroMediaUrl?: StringNullableWithAggregatesFilter<"TeamMember"> | string | null
    linkedInUrl?: StringNullableWithAggregatesFilter<"TeamMember"> | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"TeamMember"> | string | null
    sortOrder?: IntWithAggregatesFilter<"TeamMember"> | number
    userId?: StringNullableWithAggregatesFilter<"TeamMember"> | string | null
    department?: StringNullableWithAggregatesFilter<"TeamMember"> | string | null
    managerId?: StringNullableWithAggregatesFilter<"TeamMember"> | string | null
  }

  export type AssetFileWhereInput = {
    AND?: AssetFileWhereInput | AssetFileWhereInput[]
    OR?: AssetFileWhereInput[]
    NOT?: AssetFileWhereInput | AssetFileWhereInput[]
    id?: StringFilter<"AssetFile"> | string
    name?: StringFilter<"AssetFile"> | string
    content?: StringFilter<"AssetFile"> | string
    type?: StringFilter<"AssetFile"> | string
    teamMemberId?: StringFilter<"AssetFile"> | string
    createdAt?: DateTimeFilter<"AssetFile"> | Date | string
    updatedAt?: DateTimeFilter<"AssetFile"> | Date | string
    teamMember?: XOR<TeamMemberScalarRelationFilter, TeamMemberWhereInput>
  }

  export type AssetFileOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    type?: SortOrder
    teamMemberId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    teamMember?: TeamMemberOrderByWithRelationInput
  }

  export type AssetFileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AssetFileWhereInput | AssetFileWhereInput[]
    OR?: AssetFileWhereInput[]
    NOT?: AssetFileWhereInput | AssetFileWhereInput[]
    name?: StringFilter<"AssetFile"> | string
    content?: StringFilter<"AssetFile"> | string
    type?: StringFilter<"AssetFile"> | string
    teamMemberId?: StringFilter<"AssetFile"> | string
    createdAt?: DateTimeFilter<"AssetFile"> | Date | string
    updatedAt?: DateTimeFilter<"AssetFile"> | Date | string
    teamMember?: XOR<TeamMemberScalarRelationFilter, TeamMemberWhereInput>
  }, "id">

  export type AssetFileOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    type?: SortOrder
    teamMemberId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AssetFileCountOrderByAggregateInput
    _max?: AssetFileMaxOrderByAggregateInput
    _min?: AssetFileMinOrderByAggregateInput
  }

  export type AssetFileScalarWhereWithAggregatesInput = {
    AND?: AssetFileScalarWhereWithAggregatesInput | AssetFileScalarWhereWithAggregatesInput[]
    OR?: AssetFileScalarWhereWithAggregatesInput[]
    NOT?: AssetFileScalarWhereWithAggregatesInput | AssetFileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AssetFile"> | string
    name?: StringWithAggregatesFilter<"AssetFile"> | string
    content?: StringWithAggregatesFilter<"AssetFile"> | string
    type?: StringWithAggregatesFilter<"AssetFile"> | string
    teamMemberId?: StringWithAggregatesFilter<"AssetFile"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AssetFile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AssetFile"> | Date | string
  }

  export type DealWhereInput = {
    AND?: DealWhereInput | DealWhereInput[]
    OR?: DealWhereInput[]
    NOT?: DealWhereInput | DealWhereInput[]
    id?: StringFilter<"Deal"> | string
    address?: StringFilter<"Deal"> | string
    assetType?: EnumAssetTypeFilter<"Deal"> | $Enums.AssetType
    strategy?: EnumStrategyFilter<"Deal"> | $Enums.Strategy
    purchaseAmount?: FloatNullableFilter<"Deal"> | number | null
    financedAmount?: FloatNullableFilter<"Deal"> | number | null
    stillImageURL?: StringNullableFilter<"Deal"> | string | null
    generatedVideoURL?: StringNullableFilter<"Deal"> | string | null
    isPublic?: BoolFilter<"Deal"> | boolean
    capRate?: FloatNullableFilter<"Deal"> | number | null
    sqFt?: FloatNullableFilter<"Deal"> | number | null
    firmId?: StringFilter<"Deal"> | string
    teamMemberId?: StringNullableFilter<"Deal"> | string | null
    createdAt?: DateTimeFilter<"Deal"> | Date | string
    updatedAt?: DateTimeFilter<"Deal"> | Date | string
    arv?: FloatNullableFilter<"Deal"> | number | null
    context?: StringNullableFilter<"Deal"> | string | null
    financingType?: StringNullableFilter<"Deal"> | string | null
    images?: StringNullableListFilter<"Deal">
    investmentOverview?: StringNullableFilter<"Deal"> | string | null
    rehabAmount?: FloatNullableFilter<"Deal"> | number | null
    teamMemberIds?: StringNullableListFilter<"Deal">
    sortOrder?: IntFilter<"Deal"> | number
    firm?: XOR<FirmScalarRelationFilter, FirmWhereInput>
    teamMember?: XOR<TeamMemberNullableScalarRelationFilter, TeamMemberWhereInput> | null
  }

  export type DealOrderByWithRelationInput = {
    id?: SortOrder
    address?: SortOrder
    assetType?: SortOrder
    strategy?: SortOrder
    purchaseAmount?: SortOrderInput | SortOrder
    financedAmount?: SortOrderInput | SortOrder
    stillImageURL?: SortOrderInput | SortOrder
    generatedVideoURL?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    capRate?: SortOrderInput | SortOrder
    sqFt?: SortOrderInput | SortOrder
    firmId?: SortOrder
    teamMemberId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    arv?: SortOrderInput | SortOrder
    context?: SortOrderInput | SortOrder
    financingType?: SortOrderInput | SortOrder
    images?: SortOrder
    investmentOverview?: SortOrderInput | SortOrder
    rehabAmount?: SortOrderInput | SortOrder
    teamMemberIds?: SortOrder
    sortOrder?: SortOrder
    firm?: FirmOrderByWithRelationInput
    teamMember?: TeamMemberOrderByWithRelationInput
  }

  export type DealWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DealWhereInput | DealWhereInput[]
    OR?: DealWhereInput[]
    NOT?: DealWhereInput | DealWhereInput[]
    address?: StringFilter<"Deal"> | string
    assetType?: EnumAssetTypeFilter<"Deal"> | $Enums.AssetType
    strategy?: EnumStrategyFilter<"Deal"> | $Enums.Strategy
    purchaseAmount?: FloatNullableFilter<"Deal"> | number | null
    financedAmount?: FloatNullableFilter<"Deal"> | number | null
    stillImageURL?: StringNullableFilter<"Deal"> | string | null
    generatedVideoURL?: StringNullableFilter<"Deal"> | string | null
    isPublic?: BoolFilter<"Deal"> | boolean
    capRate?: FloatNullableFilter<"Deal"> | number | null
    sqFt?: FloatNullableFilter<"Deal"> | number | null
    firmId?: StringFilter<"Deal"> | string
    teamMemberId?: StringNullableFilter<"Deal"> | string | null
    createdAt?: DateTimeFilter<"Deal"> | Date | string
    updatedAt?: DateTimeFilter<"Deal"> | Date | string
    arv?: FloatNullableFilter<"Deal"> | number | null
    context?: StringNullableFilter<"Deal"> | string | null
    financingType?: StringNullableFilter<"Deal"> | string | null
    images?: StringNullableListFilter<"Deal">
    investmentOverview?: StringNullableFilter<"Deal"> | string | null
    rehabAmount?: FloatNullableFilter<"Deal"> | number | null
    teamMemberIds?: StringNullableListFilter<"Deal">
    sortOrder?: IntFilter<"Deal"> | number
    firm?: XOR<FirmScalarRelationFilter, FirmWhereInput>
    teamMember?: XOR<TeamMemberNullableScalarRelationFilter, TeamMemberWhereInput> | null
  }, "id">

  export type DealOrderByWithAggregationInput = {
    id?: SortOrder
    address?: SortOrder
    assetType?: SortOrder
    strategy?: SortOrder
    purchaseAmount?: SortOrderInput | SortOrder
    financedAmount?: SortOrderInput | SortOrder
    stillImageURL?: SortOrderInput | SortOrder
    generatedVideoURL?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    capRate?: SortOrderInput | SortOrder
    sqFt?: SortOrderInput | SortOrder
    firmId?: SortOrder
    teamMemberId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    arv?: SortOrderInput | SortOrder
    context?: SortOrderInput | SortOrder
    financingType?: SortOrderInput | SortOrder
    images?: SortOrder
    investmentOverview?: SortOrderInput | SortOrder
    rehabAmount?: SortOrderInput | SortOrder
    teamMemberIds?: SortOrder
    sortOrder?: SortOrder
    _count?: DealCountOrderByAggregateInput
    _avg?: DealAvgOrderByAggregateInput
    _max?: DealMaxOrderByAggregateInput
    _min?: DealMinOrderByAggregateInput
    _sum?: DealSumOrderByAggregateInput
  }

  export type DealScalarWhereWithAggregatesInput = {
    AND?: DealScalarWhereWithAggregatesInput | DealScalarWhereWithAggregatesInput[]
    OR?: DealScalarWhereWithAggregatesInput[]
    NOT?: DealScalarWhereWithAggregatesInput | DealScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Deal"> | string
    address?: StringWithAggregatesFilter<"Deal"> | string
    assetType?: EnumAssetTypeWithAggregatesFilter<"Deal"> | $Enums.AssetType
    strategy?: EnumStrategyWithAggregatesFilter<"Deal"> | $Enums.Strategy
    purchaseAmount?: FloatNullableWithAggregatesFilter<"Deal"> | number | null
    financedAmount?: FloatNullableWithAggregatesFilter<"Deal"> | number | null
    stillImageURL?: StringNullableWithAggregatesFilter<"Deal"> | string | null
    generatedVideoURL?: StringNullableWithAggregatesFilter<"Deal"> | string | null
    isPublic?: BoolWithAggregatesFilter<"Deal"> | boolean
    capRate?: FloatNullableWithAggregatesFilter<"Deal"> | number | null
    sqFt?: FloatNullableWithAggregatesFilter<"Deal"> | number | null
    firmId?: StringWithAggregatesFilter<"Deal"> | string
    teamMemberId?: StringNullableWithAggregatesFilter<"Deal"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Deal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Deal"> | Date | string
    arv?: FloatNullableWithAggregatesFilter<"Deal"> | number | null
    context?: StringNullableWithAggregatesFilter<"Deal"> | string | null
    financingType?: StringNullableWithAggregatesFilter<"Deal"> | string | null
    images?: StringNullableListFilter<"Deal">
    investmentOverview?: StringNullableWithAggregatesFilter<"Deal"> | string | null
    rehabAmount?: FloatNullableWithAggregatesFilter<"Deal"> | number | null
    teamMemberIds?: StringNullableListFilter<"Deal">
    sortOrder?: IntWithAggregatesFilter<"Deal"> | number
  }

  export type ActivityLogWhereInput = {
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    type?: StringFilter<"ActivityLog"> | string
    title?: StringFilter<"ActivityLog"> | string
    timestamp?: DateTimeFilter<"ActivityLog"> | Date | string
    firmId?: StringNullableFilter<"ActivityLog"> | string | null
    dealId?: StringNullableFilter<"ActivityLog"> | string | null
    userId?: StringNullableFilter<"ActivityLog"> | string | null
    memberId?: StringNullableFilter<"ActivityLog"> | string | null
    performedByEmail?: StringNullableFilter<"ActivityLog"> | string | null
    firm?: XOR<FirmNullableScalarRelationFilter, FirmWhereInput> | null
  }

  export type ActivityLogOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    timestamp?: SortOrder
    firmId?: SortOrderInput | SortOrder
    dealId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    memberId?: SortOrderInput | SortOrder
    performedByEmail?: SortOrderInput | SortOrder
    firm?: FirmOrderByWithRelationInput
  }

  export type ActivityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    type?: StringFilter<"ActivityLog"> | string
    title?: StringFilter<"ActivityLog"> | string
    timestamp?: DateTimeFilter<"ActivityLog"> | Date | string
    firmId?: StringNullableFilter<"ActivityLog"> | string | null
    dealId?: StringNullableFilter<"ActivityLog"> | string | null
    userId?: StringNullableFilter<"ActivityLog"> | string | null
    memberId?: StringNullableFilter<"ActivityLog"> | string | null
    performedByEmail?: StringNullableFilter<"ActivityLog"> | string | null
    firm?: XOR<FirmNullableScalarRelationFilter, FirmWhereInput> | null
  }, "id">

  export type ActivityLogOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    timestamp?: SortOrder
    firmId?: SortOrderInput | SortOrder
    dealId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    memberId?: SortOrderInput | SortOrder
    performedByEmail?: SortOrderInput | SortOrder
    _count?: ActivityLogCountOrderByAggregateInput
    _max?: ActivityLogMaxOrderByAggregateInput
    _min?: ActivityLogMinOrderByAggregateInput
  }

  export type ActivityLogScalarWhereWithAggregatesInput = {
    AND?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    OR?: ActivityLogScalarWhereWithAggregatesInput[]
    NOT?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActivityLog"> | string
    type?: StringWithAggregatesFilter<"ActivityLog"> | string
    title?: StringWithAggregatesFilter<"ActivityLog"> | string
    timestamp?: DateTimeWithAggregatesFilter<"ActivityLog"> | Date | string
    firmId?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    dealId?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    userId?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    memberId?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    performedByEmail?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    status?: StringFilter<"Task"> | string
    priority?: StringFilter<"Task"> | string
    assigneeId?: StringNullableFilter<"Task"> | string | null
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    firmId?: StringFilter<"Task"> | string
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    firm?: XOR<FirmScalarRelationFilter, FirmWhereInput>
    assignee?: XOR<TeamMemberNullableScalarRelationFilter, TeamMemberWhereInput> | null
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    assigneeId?: SortOrderInput | SortOrder
    dueDate?: SortOrderInput | SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firm?: FirmOrderByWithRelationInput
    assignee?: TeamMemberOrderByWithRelationInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    status?: StringFilter<"Task"> | string
    priority?: StringFilter<"Task"> | string
    assigneeId?: StringNullableFilter<"Task"> | string | null
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    firmId?: StringFilter<"Task"> | string
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    firm?: XOR<FirmScalarRelationFilter, FirmWhereInput>
    assignee?: XOR<TeamMemberNullableScalarRelationFilter, TeamMemberWhereInput> | null
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    assigneeId?: SortOrderInput | SortOrder
    dueDate?: SortOrderInput | SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    title?: StringWithAggregatesFilter<"Task"> | string
    description?: StringNullableWithAggregatesFilter<"Task"> | string | null
    status?: StringWithAggregatesFilter<"Task"> | string
    priority?: StringWithAggregatesFilter<"Task"> | string
    assigneeId?: StringNullableWithAggregatesFilter<"Task"> | string | null
    dueDate?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    firmId?: StringWithAggregatesFilter<"Task"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
  }

  export type FirmCreateInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    primaryColor?: string | null
    physicalAddress?: string | null
    linkedInUrl?: string | null
    googleReviewsUrl?: string | null
    bio?: string | null
    heroMediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accentColor?: string | null
    backgroundColor?: string | null
    fontColor?: string | null
    showAgencyBranding?: boolean
    logoScale?: number
    borderRadius?: string
    bioFontFamily?: string
    bioFontSize?: number
    firmNameFontFamily?: string
    firmNameFontSize?: number
    firmNameFontWeight?: string
    isColorLinked?: boolean
    isFontLinked?: boolean
    bioFontColor?: string
    firmNameFontColor?: string
    memberCardBgColor?: string
    memberPhotoSpacing?: number
    showMemberNarrative?: boolean
    isMemberCardColorLinked?: boolean
    cardShadowIntensity?: number
    portfolioListStyle?: string
    showSearchBar?: boolean
    teamListStyle?: string
    viewLayoutMode?: string
    tombstoneInfoBgColor?: string | null
    tombstoneLayout?: FirmCreatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: number
    tombstoneMediaBgColor?: string | null
    tombstoneMetricsBgColor?: string | null
    tombstoneNarrativeBgColor?: string | null
    tombstonePadding?: number
    activityLogs?: ActivityLogCreateNestedManyWithoutFirmInput
    deals?: DealCreateNestedManyWithoutFirmInput
    invitations?: InvitationCreateNestedManyWithoutFirmInput
    teamMembers?: TeamMemberCreateNestedManyWithoutFirmInput
    users?: UserCreateNestedManyWithoutFirmInput
    tasks?: TaskCreateNestedManyWithoutFirmInput
  }

  export type FirmUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    primaryColor?: string | null
    physicalAddress?: string | null
    linkedInUrl?: string | null
    googleReviewsUrl?: string | null
    bio?: string | null
    heroMediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accentColor?: string | null
    backgroundColor?: string | null
    fontColor?: string | null
    showAgencyBranding?: boolean
    logoScale?: number
    borderRadius?: string
    bioFontFamily?: string
    bioFontSize?: number
    firmNameFontFamily?: string
    firmNameFontSize?: number
    firmNameFontWeight?: string
    isColorLinked?: boolean
    isFontLinked?: boolean
    bioFontColor?: string
    firmNameFontColor?: string
    memberCardBgColor?: string
    memberPhotoSpacing?: number
    showMemberNarrative?: boolean
    isMemberCardColorLinked?: boolean
    cardShadowIntensity?: number
    portfolioListStyle?: string
    showSearchBar?: boolean
    teamListStyle?: string
    viewLayoutMode?: string
    tombstoneInfoBgColor?: string | null
    tombstoneLayout?: FirmCreatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: number
    tombstoneMediaBgColor?: string | null
    tombstoneMetricsBgColor?: string | null
    tombstoneNarrativeBgColor?: string | null
    tombstonePadding?: number
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutFirmInput
    deals?: DealUncheckedCreateNestedManyWithoutFirmInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutFirmInput
    teamMembers?: TeamMemberUncheckedCreateNestedManyWithoutFirmInput
    users?: UserUncheckedCreateNestedManyWithoutFirmInput
    tasks?: TaskUncheckedCreateNestedManyWithoutFirmInput
  }

  export type FirmUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleReviewsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accentColor?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundColor?: NullableStringFieldUpdateOperationsInput | string | null
    fontColor?: NullableStringFieldUpdateOperationsInput | string | null
    showAgencyBranding?: BoolFieldUpdateOperationsInput | boolean
    logoScale?: FloatFieldUpdateOperationsInput | number
    borderRadius?: StringFieldUpdateOperationsInput | string
    bioFontFamily?: StringFieldUpdateOperationsInput | string
    bioFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontFamily?: StringFieldUpdateOperationsInput | string
    firmNameFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontWeight?: StringFieldUpdateOperationsInput | string
    isColorLinked?: BoolFieldUpdateOperationsInput | boolean
    isFontLinked?: BoolFieldUpdateOperationsInput | boolean
    bioFontColor?: StringFieldUpdateOperationsInput | string
    firmNameFontColor?: StringFieldUpdateOperationsInput | string
    memberCardBgColor?: StringFieldUpdateOperationsInput | string
    memberPhotoSpacing?: IntFieldUpdateOperationsInput | number
    showMemberNarrative?: BoolFieldUpdateOperationsInput | boolean
    isMemberCardColorLinked?: BoolFieldUpdateOperationsInput | boolean
    cardShadowIntensity?: FloatFieldUpdateOperationsInput | number
    portfolioListStyle?: StringFieldUpdateOperationsInput | string
    showSearchBar?: BoolFieldUpdateOperationsInput | boolean
    teamListStyle?: StringFieldUpdateOperationsInput | string
    viewLayoutMode?: StringFieldUpdateOperationsInput | string
    tombstoneInfoBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneLayout?: FirmUpdatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: IntFieldUpdateOperationsInput | number
    tombstoneMediaBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneMetricsBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneNarrativeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstonePadding?: IntFieldUpdateOperationsInput | number
    activityLogs?: ActivityLogUpdateManyWithoutFirmNestedInput
    deals?: DealUpdateManyWithoutFirmNestedInput
    invitations?: InvitationUpdateManyWithoutFirmNestedInput
    teamMembers?: TeamMemberUpdateManyWithoutFirmNestedInput
    users?: UserUpdateManyWithoutFirmNestedInput
    tasks?: TaskUpdateManyWithoutFirmNestedInput
  }

  export type FirmUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleReviewsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accentColor?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundColor?: NullableStringFieldUpdateOperationsInput | string | null
    fontColor?: NullableStringFieldUpdateOperationsInput | string | null
    showAgencyBranding?: BoolFieldUpdateOperationsInput | boolean
    logoScale?: FloatFieldUpdateOperationsInput | number
    borderRadius?: StringFieldUpdateOperationsInput | string
    bioFontFamily?: StringFieldUpdateOperationsInput | string
    bioFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontFamily?: StringFieldUpdateOperationsInput | string
    firmNameFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontWeight?: StringFieldUpdateOperationsInput | string
    isColorLinked?: BoolFieldUpdateOperationsInput | boolean
    isFontLinked?: BoolFieldUpdateOperationsInput | boolean
    bioFontColor?: StringFieldUpdateOperationsInput | string
    firmNameFontColor?: StringFieldUpdateOperationsInput | string
    memberCardBgColor?: StringFieldUpdateOperationsInput | string
    memberPhotoSpacing?: IntFieldUpdateOperationsInput | number
    showMemberNarrative?: BoolFieldUpdateOperationsInput | boolean
    isMemberCardColorLinked?: BoolFieldUpdateOperationsInput | boolean
    cardShadowIntensity?: FloatFieldUpdateOperationsInput | number
    portfolioListStyle?: StringFieldUpdateOperationsInput | string
    showSearchBar?: BoolFieldUpdateOperationsInput | boolean
    teamListStyle?: StringFieldUpdateOperationsInput | string
    viewLayoutMode?: StringFieldUpdateOperationsInput | string
    tombstoneInfoBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneLayout?: FirmUpdatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: IntFieldUpdateOperationsInput | number
    tombstoneMediaBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneMetricsBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneNarrativeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstonePadding?: IntFieldUpdateOperationsInput | number
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutFirmNestedInput
    deals?: DealUncheckedUpdateManyWithoutFirmNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutFirmNestedInput
    teamMembers?: TeamMemberUncheckedUpdateManyWithoutFirmNestedInput
    users?: UserUncheckedUpdateManyWithoutFirmNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutFirmNestedInput
  }

  export type FirmCreateManyInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    primaryColor?: string | null
    physicalAddress?: string | null
    linkedInUrl?: string | null
    googleReviewsUrl?: string | null
    bio?: string | null
    heroMediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accentColor?: string | null
    backgroundColor?: string | null
    fontColor?: string | null
    showAgencyBranding?: boolean
    logoScale?: number
    borderRadius?: string
    bioFontFamily?: string
    bioFontSize?: number
    firmNameFontFamily?: string
    firmNameFontSize?: number
    firmNameFontWeight?: string
    isColorLinked?: boolean
    isFontLinked?: boolean
    bioFontColor?: string
    firmNameFontColor?: string
    memberCardBgColor?: string
    memberPhotoSpacing?: number
    showMemberNarrative?: boolean
    isMemberCardColorLinked?: boolean
    cardShadowIntensity?: number
    portfolioListStyle?: string
    showSearchBar?: boolean
    teamListStyle?: string
    viewLayoutMode?: string
    tombstoneInfoBgColor?: string | null
    tombstoneLayout?: FirmCreatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: number
    tombstoneMediaBgColor?: string | null
    tombstoneMetricsBgColor?: string | null
    tombstoneNarrativeBgColor?: string | null
    tombstonePadding?: number
  }

  export type FirmUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleReviewsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accentColor?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundColor?: NullableStringFieldUpdateOperationsInput | string | null
    fontColor?: NullableStringFieldUpdateOperationsInput | string | null
    showAgencyBranding?: BoolFieldUpdateOperationsInput | boolean
    logoScale?: FloatFieldUpdateOperationsInput | number
    borderRadius?: StringFieldUpdateOperationsInput | string
    bioFontFamily?: StringFieldUpdateOperationsInput | string
    bioFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontFamily?: StringFieldUpdateOperationsInput | string
    firmNameFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontWeight?: StringFieldUpdateOperationsInput | string
    isColorLinked?: BoolFieldUpdateOperationsInput | boolean
    isFontLinked?: BoolFieldUpdateOperationsInput | boolean
    bioFontColor?: StringFieldUpdateOperationsInput | string
    firmNameFontColor?: StringFieldUpdateOperationsInput | string
    memberCardBgColor?: StringFieldUpdateOperationsInput | string
    memberPhotoSpacing?: IntFieldUpdateOperationsInput | number
    showMemberNarrative?: BoolFieldUpdateOperationsInput | boolean
    isMemberCardColorLinked?: BoolFieldUpdateOperationsInput | boolean
    cardShadowIntensity?: FloatFieldUpdateOperationsInput | number
    portfolioListStyle?: StringFieldUpdateOperationsInput | string
    showSearchBar?: BoolFieldUpdateOperationsInput | boolean
    teamListStyle?: StringFieldUpdateOperationsInput | string
    viewLayoutMode?: StringFieldUpdateOperationsInput | string
    tombstoneInfoBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneLayout?: FirmUpdatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: IntFieldUpdateOperationsInput | number
    tombstoneMediaBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneMetricsBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneNarrativeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstonePadding?: IntFieldUpdateOperationsInput | number
  }

  export type FirmUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleReviewsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accentColor?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundColor?: NullableStringFieldUpdateOperationsInput | string | null
    fontColor?: NullableStringFieldUpdateOperationsInput | string | null
    showAgencyBranding?: BoolFieldUpdateOperationsInput | boolean
    logoScale?: FloatFieldUpdateOperationsInput | number
    borderRadius?: StringFieldUpdateOperationsInput | string
    bioFontFamily?: StringFieldUpdateOperationsInput | string
    bioFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontFamily?: StringFieldUpdateOperationsInput | string
    firmNameFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontWeight?: StringFieldUpdateOperationsInput | string
    isColorLinked?: BoolFieldUpdateOperationsInput | boolean
    isFontLinked?: BoolFieldUpdateOperationsInput | boolean
    bioFontColor?: StringFieldUpdateOperationsInput | string
    firmNameFontColor?: StringFieldUpdateOperationsInput | string
    memberCardBgColor?: StringFieldUpdateOperationsInput | string
    memberPhotoSpacing?: IntFieldUpdateOperationsInput | number
    showMemberNarrative?: BoolFieldUpdateOperationsInput | boolean
    isMemberCardColorLinked?: BoolFieldUpdateOperationsInput | boolean
    cardShadowIntensity?: FloatFieldUpdateOperationsInput | number
    portfolioListStyle?: StringFieldUpdateOperationsInput | string
    showSearchBar?: BoolFieldUpdateOperationsInput | boolean
    teamListStyle?: StringFieldUpdateOperationsInput | string
    viewLayoutMode?: StringFieldUpdateOperationsInput | string
    tombstoneInfoBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneLayout?: FirmUpdatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: IntFieldUpdateOperationsInput | number
    tombstoneMediaBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneMetricsBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneNarrativeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstonePadding?: IntFieldUpdateOperationsInput | number
  }

  export type InvitationCreateInput = {
    id?: string
    email: string
    token: string
    role?: $Enums.UserRole
    isUsed?: boolean
    createdAt?: Date | string
    expiresAt: Date | string
    firm: FirmCreateNestedOneWithoutInvitationsInput
  }

  export type InvitationUncheckedCreateInput = {
    id?: string
    email: string
    token: string
    role?: $Enums.UserRole
    firmId: string
    isUsed?: boolean
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type InvitationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firm?: FirmUpdateOneRequiredWithoutInvitationsNestedInput
  }

  export type InvitationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firmId?: StringFieldUpdateOperationsInput | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationCreateManyInput = {
    id?: string
    email: string
    token: string
    role?: $Enums.UserRole
    firmId: string
    isUsed?: boolean
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type InvitationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firmId?: StringFieldUpdateOperationsInput | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    name?: string | null
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
    professionalProfile?: TeamMemberCreateNestedOneWithoutUserInput
    firm: FirmCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name?: string | null
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
    professionalProfile?: TeamMemberUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    professionalProfile?: TeamMemberUpdateOneWithoutUserNestedInput
    firm?: FirmUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    professionalProfile?: TeamMemberUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name?: string | null
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TeamMemberCreateInput = {
    id?: string
    name: string
    slug: string
    role: string
    email?: string | null
    imageURL?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bio?: string | null
    firmIds?: TeamMemberCreatefirmIdsInput | string[]
    heroMediaUrl?: string | null
    linkedInUrl?: string | null
    phoneNumber?: string | null
    sortOrder?: number
    department?: string | null
    manager?: TeamMemberCreateNestedOneWithoutReportsInput
    reports?: TeamMemberCreateNestedManyWithoutManagerInput
    deals?: DealCreateNestedManyWithoutTeamMemberInput
    tasks?: TaskCreateNestedManyWithoutAssigneeInput
    firm: FirmCreateNestedOneWithoutTeamMembersInput
    user?: UserCreateNestedOneWithoutProfessionalProfileInput
    files?: AssetFileCreateNestedManyWithoutTeamMemberInput
  }

  export type TeamMemberUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    role: string
    email?: string | null
    imageURL?: string | null
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    bio?: string | null
    firmIds?: TeamMemberCreatefirmIdsInput | string[]
    heroMediaUrl?: string | null
    linkedInUrl?: string | null
    phoneNumber?: string | null
    sortOrder?: number
    userId?: string | null
    department?: string | null
    managerId?: string | null
    reports?: TeamMemberUncheckedCreateNestedManyWithoutManagerInput
    deals?: DealUncheckedCreateNestedManyWithoutTeamMemberInput
    tasks?: TaskUncheckedCreateNestedManyWithoutAssigneeInput
    files?: AssetFileUncheckedCreateNestedManyWithoutTeamMemberInput
  }

  export type TeamMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    department?: NullableStringFieldUpdateOperationsInput | string | null
    manager?: TeamMemberUpdateOneWithoutReportsNestedInput
    reports?: TeamMemberUpdateManyWithoutManagerNestedInput
    deals?: DealUpdateManyWithoutTeamMemberNestedInput
    tasks?: TaskUpdateManyWithoutAssigneeNestedInput
    firm?: FirmUpdateOneRequiredWithoutTeamMembersNestedInput
    user?: UserUpdateOneWithoutProfessionalProfileNestedInput
    files?: AssetFileUpdateManyWithoutTeamMemberNestedInput
  }

  export type TeamMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    reports?: TeamMemberUncheckedUpdateManyWithoutManagerNestedInput
    deals?: DealUncheckedUpdateManyWithoutTeamMemberNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutAssigneeNestedInput
    files?: AssetFileUncheckedUpdateManyWithoutTeamMemberNestedInput
  }

  export type TeamMemberCreateManyInput = {
    id?: string
    name: string
    slug: string
    role: string
    email?: string | null
    imageURL?: string | null
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    bio?: string | null
    firmIds?: TeamMemberCreatefirmIdsInput | string[]
    heroMediaUrl?: string | null
    linkedInUrl?: string | null
    phoneNumber?: string | null
    sortOrder?: number
    userId?: string | null
    department?: string | null
    managerId?: string | null
  }

  export type TeamMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    department?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TeamMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AssetFileCreateInput = {
    id?: string
    name: string
    content: string
    type?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teamMember: TeamMemberCreateNestedOneWithoutFilesInput
  }

  export type AssetFileUncheckedCreateInput = {
    id?: string
    name: string
    content: string
    type?: string
    teamMemberId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssetFileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamMember?: TeamMemberUpdateOneRequiredWithoutFilesNestedInput
  }

  export type AssetFileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    teamMemberId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetFileCreateManyInput = {
    id?: string
    name: string
    content: string
    type?: string
    teamMemberId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssetFileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetFileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    teamMemberId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DealCreateInput = {
    id?: string
    address: string
    assetType: $Enums.AssetType
    strategy: $Enums.Strategy
    purchaseAmount?: number | null
    financedAmount?: number | null
    stillImageURL?: string | null
    generatedVideoURL?: string | null
    isPublic?: boolean
    capRate?: number | null
    sqFt?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    arv?: number | null
    context?: string | null
    financingType?: string | null
    images?: DealCreateimagesInput | string[]
    investmentOverview?: string | null
    rehabAmount?: number | null
    teamMemberIds?: DealCreateteamMemberIdsInput | string[]
    sortOrder?: number
    firm: FirmCreateNestedOneWithoutDealsInput
    teamMember?: TeamMemberCreateNestedOneWithoutDealsInput
  }

  export type DealUncheckedCreateInput = {
    id?: string
    address: string
    assetType: $Enums.AssetType
    strategy: $Enums.Strategy
    purchaseAmount?: number | null
    financedAmount?: number | null
    stillImageURL?: string | null
    generatedVideoURL?: string | null
    isPublic?: boolean
    capRate?: number | null
    sqFt?: number | null
    firmId: string
    teamMemberId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    arv?: number | null
    context?: string | null
    financingType?: string | null
    images?: DealCreateimagesInput | string[]
    investmentOverview?: string | null
    rehabAmount?: number | null
    teamMemberIds?: DealCreateteamMemberIdsInput | string[]
    sortOrder?: number
  }

  export type DealUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    assetType?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    strategy?: EnumStrategyFieldUpdateOperationsInput | $Enums.Strategy
    purchaseAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    financedAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    stillImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    generatedVideoURL?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    capRate?: NullableFloatFieldUpdateOperationsInput | number | null
    sqFt?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arv?: NullableFloatFieldUpdateOperationsInput | number | null
    context?: NullableStringFieldUpdateOperationsInput | string | null
    financingType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: DealUpdateimagesInput | string[]
    investmentOverview?: NullableStringFieldUpdateOperationsInput | string | null
    rehabAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    teamMemberIds?: DealUpdateteamMemberIdsInput | string[]
    sortOrder?: IntFieldUpdateOperationsInput | number
    firm?: FirmUpdateOneRequiredWithoutDealsNestedInput
    teamMember?: TeamMemberUpdateOneWithoutDealsNestedInput
  }

  export type DealUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    assetType?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    strategy?: EnumStrategyFieldUpdateOperationsInput | $Enums.Strategy
    purchaseAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    financedAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    stillImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    generatedVideoURL?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    capRate?: NullableFloatFieldUpdateOperationsInput | number | null
    sqFt?: NullableFloatFieldUpdateOperationsInput | number | null
    firmId?: StringFieldUpdateOperationsInput | string
    teamMemberId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arv?: NullableFloatFieldUpdateOperationsInput | number | null
    context?: NullableStringFieldUpdateOperationsInput | string | null
    financingType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: DealUpdateimagesInput | string[]
    investmentOverview?: NullableStringFieldUpdateOperationsInput | string | null
    rehabAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    teamMemberIds?: DealUpdateteamMemberIdsInput | string[]
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type DealCreateManyInput = {
    id?: string
    address: string
    assetType: $Enums.AssetType
    strategy: $Enums.Strategy
    purchaseAmount?: number | null
    financedAmount?: number | null
    stillImageURL?: string | null
    generatedVideoURL?: string | null
    isPublic?: boolean
    capRate?: number | null
    sqFt?: number | null
    firmId: string
    teamMemberId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    arv?: number | null
    context?: string | null
    financingType?: string | null
    images?: DealCreateimagesInput | string[]
    investmentOverview?: string | null
    rehabAmount?: number | null
    teamMemberIds?: DealCreateteamMemberIdsInput | string[]
    sortOrder?: number
  }

  export type DealUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    assetType?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    strategy?: EnumStrategyFieldUpdateOperationsInput | $Enums.Strategy
    purchaseAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    financedAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    stillImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    generatedVideoURL?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    capRate?: NullableFloatFieldUpdateOperationsInput | number | null
    sqFt?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arv?: NullableFloatFieldUpdateOperationsInput | number | null
    context?: NullableStringFieldUpdateOperationsInput | string | null
    financingType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: DealUpdateimagesInput | string[]
    investmentOverview?: NullableStringFieldUpdateOperationsInput | string | null
    rehabAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    teamMemberIds?: DealUpdateteamMemberIdsInput | string[]
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type DealUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    assetType?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    strategy?: EnumStrategyFieldUpdateOperationsInput | $Enums.Strategy
    purchaseAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    financedAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    stillImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    generatedVideoURL?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    capRate?: NullableFloatFieldUpdateOperationsInput | number | null
    sqFt?: NullableFloatFieldUpdateOperationsInput | number | null
    firmId?: StringFieldUpdateOperationsInput | string
    teamMemberId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arv?: NullableFloatFieldUpdateOperationsInput | number | null
    context?: NullableStringFieldUpdateOperationsInput | string | null
    financingType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: DealUpdateimagesInput | string[]
    investmentOverview?: NullableStringFieldUpdateOperationsInput | string | null
    rehabAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    teamMemberIds?: DealUpdateteamMemberIdsInput | string[]
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ActivityLogCreateInput = {
    id?: string
    type: string
    title: string
    timestamp?: Date | string
    dealId?: string | null
    userId?: string | null
    memberId?: string | null
    performedByEmail?: string | null
    firm?: FirmCreateNestedOneWithoutActivityLogsInput
  }

  export type ActivityLogUncheckedCreateInput = {
    id?: string
    type: string
    title: string
    timestamp?: Date | string
    firmId?: string | null
    dealId?: string | null
    userId?: string | null
    memberId?: string | null
    performedByEmail?: string | null
  }

  export type ActivityLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    dealId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    memberId?: NullableStringFieldUpdateOperationsInput | string | null
    performedByEmail?: NullableStringFieldUpdateOperationsInput | string | null
    firm?: FirmUpdateOneWithoutActivityLogsNestedInput
  }

  export type ActivityLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    firmId?: NullableStringFieldUpdateOperationsInput | string | null
    dealId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    memberId?: NullableStringFieldUpdateOperationsInput | string | null
    performedByEmail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityLogCreateManyInput = {
    id?: string
    type: string
    title: string
    timestamp?: Date | string
    firmId?: string | null
    dealId?: string | null
    userId?: string | null
    memberId?: string | null
    performedByEmail?: string | null
  }

  export type ActivityLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    dealId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    memberId?: NullableStringFieldUpdateOperationsInput | string | null
    performedByEmail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    firmId?: NullableStringFieldUpdateOperationsInput | string | null
    dealId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    memberId?: NullableStringFieldUpdateOperationsInput | string | null
    performedByEmail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskCreateInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    priority?: string
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    firm: FirmCreateNestedOneWithoutTasksInput
    assignee?: TeamMemberCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    priority?: string
    assigneeId?: string | null
    dueDate?: Date | string | null
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firm?: FirmUpdateOneRequiredWithoutTasksNestedInput
    assignee?: TeamMemberUpdateOneWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    assigneeId?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    priority?: string
    assigneeId?: string | null
    dueDate?: Date | string | null
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    assigneeId?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ActivityLogListRelationFilter = {
    every?: ActivityLogWhereInput
    some?: ActivityLogWhereInput
    none?: ActivityLogWhereInput
  }

  export type DealListRelationFilter = {
    every?: DealWhereInput
    some?: DealWhereInput
    none?: DealWhereInput
  }

  export type InvitationListRelationFilter = {
    every?: InvitationWhereInput
    some?: InvitationWhereInput
    none?: InvitationWhereInput
  }

  export type TeamMemberListRelationFilter = {
    every?: TeamMemberWhereInput
    some?: TeamMemberWhereInput
    none?: TeamMemberWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ActivityLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DealOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvitationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FirmCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoUrl?: SortOrder
    primaryColor?: SortOrder
    physicalAddress?: SortOrder
    linkedInUrl?: SortOrder
    googleReviewsUrl?: SortOrder
    bio?: SortOrder
    heroMediaUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accentColor?: SortOrder
    backgroundColor?: SortOrder
    fontColor?: SortOrder
    showAgencyBranding?: SortOrder
    logoScale?: SortOrder
    borderRadius?: SortOrder
    bioFontFamily?: SortOrder
    bioFontSize?: SortOrder
    firmNameFontFamily?: SortOrder
    firmNameFontSize?: SortOrder
    firmNameFontWeight?: SortOrder
    isColorLinked?: SortOrder
    isFontLinked?: SortOrder
    bioFontColor?: SortOrder
    firmNameFontColor?: SortOrder
    memberCardBgColor?: SortOrder
    memberPhotoSpacing?: SortOrder
    showMemberNarrative?: SortOrder
    isMemberCardColorLinked?: SortOrder
    cardShadowIntensity?: SortOrder
    portfolioListStyle?: SortOrder
    showSearchBar?: SortOrder
    teamListStyle?: SortOrder
    viewLayoutMode?: SortOrder
    tombstoneInfoBgColor?: SortOrder
    tombstoneLayout?: SortOrder
    tombstoneMaxWidth?: SortOrder
    tombstoneMediaBgColor?: SortOrder
    tombstoneMetricsBgColor?: SortOrder
    tombstoneNarrativeBgColor?: SortOrder
    tombstonePadding?: SortOrder
  }

  export type FirmAvgOrderByAggregateInput = {
    logoScale?: SortOrder
    bioFontSize?: SortOrder
    firmNameFontSize?: SortOrder
    memberPhotoSpacing?: SortOrder
    cardShadowIntensity?: SortOrder
    tombstoneMaxWidth?: SortOrder
    tombstonePadding?: SortOrder
  }

  export type FirmMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoUrl?: SortOrder
    primaryColor?: SortOrder
    physicalAddress?: SortOrder
    linkedInUrl?: SortOrder
    googleReviewsUrl?: SortOrder
    bio?: SortOrder
    heroMediaUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accentColor?: SortOrder
    backgroundColor?: SortOrder
    fontColor?: SortOrder
    showAgencyBranding?: SortOrder
    logoScale?: SortOrder
    borderRadius?: SortOrder
    bioFontFamily?: SortOrder
    bioFontSize?: SortOrder
    firmNameFontFamily?: SortOrder
    firmNameFontSize?: SortOrder
    firmNameFontWeight?: SortOrder
    isColorLinked?: SortOrder
    isFontLinked?: SortOrder
    bioFontColor?: SortOrder
    firmNameFontColor?: SortOrder
    memberCardBgColor?: SortOrder
    memberPhotoSpacing?: SortOrder
    showMemberNarrative?: SortOrder
    isMemberCardColorLinked?: SortOrder
    cardShadowIntensity?: SortOrder
    portfolioListStyle?: SortOrder
    showSearchBar?: SortOrder
    teamListStyle?: SortOrder
    viewLayoutMode?: SortOrder
    tombstoneInfoBgColor?: SortOrder
    tombstoneMaxWidth?: SortOrder
    tombstoneMediaBgColor?: SortOrder
    tombstoneMetricsBgColor?: SortOrder
    tombstoneNarrativeBgColor?: SortOrder
    tombstonePadding?: SortOrder
  }

  export type FirmMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoUrl?: SortOrder
    primaryColor?: SortOrder
    physicalAddress?: SortOrder
    linkedInUrl?: SortOrder
    googleReviewsUrl?: SortOrder
    bio?: SortOrder
    heroMediaUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accentColor?: SortOrder
    backgroundColor?: SortOrder
    fontColor?: SortOrder
    showAgencyBranding?: SortOrder
    logoScale?: SortOrder
    borderRadius?: SortOrder
    bioFontFamily?: SortOrder
    bioFontSize?: SortOrder
    firmNameFontFamily?: SortOrder
    firmNameFontSize?: SortOrder
    firmNameFontWeight?: SortOrder
    isColorLinked?: SortOrder
    isFontLinked?: SortOrder
    bioFontColor?: SortOrder
    firmNameFontColor?: SortOrder
    memberCardBgColor?: SortOrder
    memberPhotoSpacing?: SortOrder
    showMemberNarrative?: SortOrder
    isMemberCardColorLinked?: SortOrder
    cardShadowIntensity?: SortOrder
    portfolioListStyle?: SortOrder
    showSearchBar?: SortOrder
    teamListStyle?: SortOrder
    viewLayoutMode?: SortOrder
    tombstoneInfoBgColor?: SortOrder
    tombstoneMaxWidth?: SortOrder
    tombstoneMediaBgColor?: SortOrder
    tombstoneMetricsBgColor?: SortOrder
    tombstoneNarrativeBgColor?: SortOrder
    tombstonePadding?: SortOrder
  }

  export type FirmSumOrderByAggregateInput = {
    logoScale?: SortOrder
    bioFontSize?: SortOrder
    firmNameFontSize?: SortOrder
    memberPhotoSpacing?: SortOrder
    cardShadowIntensity?: SortOrder
    tombstoneMaxWidth?: SortOrder
    tombstonePadding?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type FirmScalarRelationFilter = {
    is?: FirmWhereInput
    isNot?: FirmWhereInput
  }

  export type InvitationCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    role?: SortOrder
    firmId?: SortOrder
    isUsed?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type InvitationMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    role?: SortOrder
    firmId?: SortOrder
    isUsed?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type InvitationMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    role?: SortOrder
    firmId?: SortOrder
    isUsed?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type TeamMemberNullableScalarRelationFilter = {
    is?: TeamMemberWhereInput | null
    isNot?: TeamMemberWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    resetToken?: SortOrder
    resetTokenExpires?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    resetToken?: SortOrder
    resetTokenExpires?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    resetToken?: SortOrder
    resetTokenExpires?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AssetFileListRelationFilter = {
    every?: AssetFileWhereInput
    some?: AssetFileWhereInput
    none?: AssetFileWhereInput
  }

  export type AssetFileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamMemberCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    role?: SortOrder
    email?: SortOrder
    imageURL?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bio?: SortOrder
    firmIds?: SortOrder
    heroMediaUrl?: SortOrder
    linkedInUrl?: SortOrder
    phoneNumber?: SortOrder
    sortOrder?: SortOrder
    userId?: SortOrder
    department?: SortOrder
    managerId?: SortOrder
  }

  export type TeamMemberAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type TeamMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    role?: SortOrder
    email?: SortOrder
    imageURL?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bio?: SortOrder
    heroMediaUrl?: SortOrder
    linkedInUrl?: SortOrder
    phoneNumber?: SortOrder
    sortOrder?: SortOrder
    userId?: SortOrder
    department?: SortOrder
    managerId?: SortOrder
  }

  export type TeamMemberMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    role?: SortOrder
    email?: SortOrder
    imageURL?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bio?: SortOrder
    heroMediaUrl?: SortOrder
    linkedInUrl?: SortOrder
    phoneNumber?: SortOrder
    sortOrder?: SortOrder
    userId?: SortOrder
    department?: SortOrder
    managerId?: SortOrder
  }

  export type TeamMemberSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type TeamMemberScalarRelationFilter = {
    is?: TeamMemberWhereInput
    isNot?: TeamMemberWhereInput
  }

  export type AssetFileCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    type?: SortOrder
    teamMemberId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssetFileMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    type?: SortOrder
    teamMemberId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssetFileMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    type?: SortOrder
    teamMemberId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumAssetTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetType | EnumAssetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetTypeFilter<$PrismaModel> | $Enums.AssetType
  }

  export type EnumStrategyFilter<$PrismaModel = never> = {
    equals?: $Enums.Strategy | EnumStrategyFieldRefInput<$PrismaModel>
    in?: $Enums.Strategy[] | ListEnumStrategyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Strategy[] | ListEnumStrategyFieldRefInput<$PrismaModel>
    not?: NestedEnumStrategyFilter<$PrismaModel> | $Enums.Strategy
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DealCountOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    assetType?: SortOrder
    strategy?: SortOrder
    purchaseAmount?: SortOrder
    financedAmount?: SortOrder
    stillImageURL?: SortOrder
    generatedVideoURL?: SortOrder
    isPublic?: SortOrder
    capRate?: SortOrder
    sqFt?: SortOrder
    firmId?: SortOrder
    teamMemberId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    arv?: SortOrder
    context?: SortOrder
    financingType?: SortOrder
    images?: SortOrder
    investmentOverview?: SortOrder
    rehabAmount?: SortOrder
    teamMemberIds?: SortOrder
    sortOrder?: SortOrder
  }

  export type DealAvgOrderByAggregateInput = {
    purchaseAmount?: SortOrder
    financedAmount?: SortOrder
    capRate?: SortOrder
    sqFt?: SortOrder
    arv?: SortOrder
    rehabAmount?: SortOrder
    sortOrder?: SortOrder
  }

  export type DealMaxOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    assetType?: SortOrder
    strategy?: SortOrder
    purchaseAmount?: SortOrder
    financedAmount?: SortOrder
    stillImageURL?: SortOrder
    generatedVideoURL?: SortOrder
    isPublic?: SortOrder
    capRate?: SortOrder
    sqFt?: SortOrder
    firmId?: SortOrder
    teamMemberId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    arv?: SortOrder
    context?: SortOrder
    financingType?: SortOrder
    investmentOverview?: SortOrder
    rehabAmount?: SortOrder
    sortOrder?: SortOrder
  }

  export type DealMinOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    assetType?: SortOrder
    strategy?: SortOrder
    purchaseAmount?: SortOrder
    financedAmount?: SortOrder
    stillImageURL?: SortOrder
    generatedVideoURL?: SortOrder
    isPublic?: SortOrder
    capRate?: SortOrder
    sqFt?: SortOrder
    firmId?: SortOrder
    teamMemberId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    arv?: SortOrder
    context?: SortOrder
    financingType?: SortOrder
    investmentOverview?: SortOrder
    rehabAmount?: SortOrder
    sortOrder?: SortOrder
  }

  export type DealSumOrderByAggregateInput = {
    purchaseAmount?: SortOrder
    financedAmount?: SortOrder
    capRate?: SortOrder
    sqFt?: SortOrder
    arv?: SortOrder
    rehabAmount?: SortOrder
    sortOrder?: SortOrder
  }

  export type EnumAssetTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetType | EnumAssetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetTypeWithAggregatesFilter<$PrismaModel> | $Enums.AssetType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssetTypeFilter<$PrismaModel>
    _max?: NestedEnumAssetTypeFilter<$PrismaModel>
  }

  export type EnumStrategyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Strategy | EnumStrategyFieldRefInput<$PrismaModel>
    in?: $Enums.Strategy[] | ListEnumStrategyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Strategy[] | ListEnumStrategyFieldRefInput<$PrismaModel>
    not?: NestedEnumStrategyWithAggregatesFilter<$PrismaModel> | $Enums.Strategy
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStrategyFilter<$PrismaModel>
    _max?: NestedEnumStrategyFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type FirmNullableScalarRelationFilter = {
    is?: FirmWhereInput | null
    isNot?: FirmWhereInput | null
  }

  export type ActivityLogCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    timestamp?: SortOrder
    firmId?: SortOrder
    dealId?: SortOrder
    userId?: SortOrder
    memberId?: SortOrder
    performedByEmail?: SortOrder
  }

  export type ActivityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    timestamp?: SortOrder
    firmId?: SortOrder
    dealId?: SortOrder
    userId?: SortOrder
    memberId?: SortOrder
    performedByEmail?: SortOrder
  }

  export type ActivityLogMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    title?: SortOrder
    timestamp?: SortOrder
    firmId?: SortOrder
    dealId?: SortOrder
    userId?: SortOrder
    memberId?: SortOrder
    performedByEmail?: SortOrder
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    assigneeId?: SortOrder
    dueDate?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    assigneeId?: SortOrder
    dueDate?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    assigneeId?: SortOrder
    dueDate?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FirmCreatetombstoneLayoutInput = {
    set: string[]
  }

  export type ActivityLogCreateNestedManyWithoutFirmInput = {
    create?: XOR<ActivityLogCreateWithoutFirmInput, ActivityLogUncheckedCreateWithoutFirmInput> | ActivityLogCreateWithoutFirmInput[] | ActivityLogUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutFirmInput | ActivityLogCreateOrConnectWithoutFirmInput[]
    createMany?: ActivityLogCreateManyFirmInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type DealCreateNestedManyWithoutFirmInput = {
    create?: XOR<DealCreateWithoutFirmInput, DealUncheckedCreateWithoutFirmInput> | DealCreateWithoutFirmInput[] | DealUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: DealCreateOrConnectWithoutFirmInput | DealCreateOrConnectWithoutFirmInput[]
    createMany?: DealCreateManyFirmInputEnvelope
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
  }

  export type InvitationCreateNestedManyWithoutFirmInput = {
    create?: XOR<InvitationCreateWithoutFirmInput, InvitationUncheckedCreateWithoutFirmInput> | InvitationCreateWithoutFirmInput[] | InvitationUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutFirmInput | InvitationCreateOrConnectWithoutFirmInput[]
    createMany?: InvitationCreateManyFirmInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type TeamMemberCreateNestedManyWithoutFirmInput = {
    create?: XOR<TeamMemberCreateWithoutFirmInput, TeamMemberUncheckedCreateWithoutFirmInput> | TeamMemberCreateWithoutFirmInput[] | TeamMemberUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutFirmInput | TeamMemberCreateOrConnectWithoutFirmInput[]
    createMany?: TeamMemberCreateManyFirmInputEnvelope
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutFirmInput = {
    create?: XOR<UserCreateWithoutFirmInput, UserUncheckedCreateWithoutFirmInput> | UserCreateWithoutFirmInput[] | UserUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFirmInput | UserCreateOrConnectWithoutFirmInput[]
    createMany?: UserCreateManyFirmInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutFirmInput = {
    create?: XOR<TaskCreateWithoutFirmInput, TaskUncheckedCreateWithoutFirmInput> | TaskCreateWithoutFirmInput[] | TaskUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutFirmInput | TaskCreateOrConnectWithoutFirmInput[]
    createMany?: TaskCreateManyFirmInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ActivityLogUncheckedCreateNestedManyWithoutFirmInput = {
    create?: XOR<ActivityLogCreateWithoutFirmInput, ActivityLogUncheckedCreateWithoutFirmInput> | ActivityLogCreateWithoutFirmInput[] | ActivityLogUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutFirmInput | ActivityLogCreateOrConnectWithoutFirmInput[]
    createMany?: ActivityLogCreateManyFirmInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type DealUncheckedCreateNestedManyWithoutFirmInput = {
    create?: XOR<DealCreateWithoutFirmInput, DealUncheckedCreateWithoutFirmInput> | DealCreateWithoutFirmInput[] | DealUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: DealCreateOrConnectWithoutFirmInput | DealCreateOrConnectWithoutFirmInput[]
    createMany?: DealCreateManyFirmInputEnvelope
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
  }

  export type InvitationUncheckedCreateNestedManyWithoutFirmInput = {
    create?: XOR<InvitationCreateWithoutFirmInput, InvitationUncheckedCreateWithoutFirmInput> | InvitationCreateWithoutFirmInput[] | InvitationUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutFirmInput | InvitationCreateOrConnectWithoutFirmInput[]
    createMany?: InvitationCreateManyFirmInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type TeamMemberUncheckedCreateNestedManyWithoutFirmInput = {
    create?: XOR<TeamMemberCreateWithoutFirmInput, TeamMemberUncheckedCreateWithoutFirmInput> | TeamMemberCreateWithoutFirmInput[] | TeamMemberUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutFirmInput | TeamMemberCreateOrConnectWithoutFirmInput[]
    createMany?: TeamMemberCreateManyFirmInputEnvelope
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutFirmInput = {
    create?: XOR<UserCreateWithoutFirmInput, UserUncheckedCreateWithoutFirmInput> | UserCreateWithoutFirmInput[] | UserUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFirmInput | UserCreateOrConnectWithoutFirmInput[]
    createMany?: UserCreateManyFirmInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutFirmInput = {
    create?: XOR<TaskCreateWithoutFirmInput, TaskUncheckedCreateWithoutFirmInput> | TaskCreateWithoutFirmInput[] | TaskUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutFirmInput | TaskCreateOrConnectWithoutFirmInput[]
    createMany?: TaskCreateManyFirmInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FirmUpdatetombstoneLayoutInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ActivityLogUpdateManyWithoutFirmNestedInput = {
    create?: XOR<ActivityLogCreateWithoutFirmInput, ActivityLogUncheckedCreateWithoutFirmInput> | ActivityLogCreateWithoutFirmInput[] | ActivityLogUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutFirmInput | ActivityLogCreateOrConnectWithoutFirmInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutFirmInput | ActivityLogUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: ActivityLogCreateManyFirmInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutFirmInput | ActivityLogUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutFirmInput | ActivityLogUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type DealUpdateManyWithoutFirmNestedInput = {
    create?: XOR<DealCreateWithoutFirmInput, DealUncheckedCreateWithoutFirmInput> | DealCreateWithoutFirmInput[] | DealUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: DealCreateOrConnectWithoutFirmInput | DealCreateOrConnectWithoutFirmInput[]
    upsert?: DealUpsertWithWhereUniqueWithoutFirmInput | DealUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: DealCreateManyFirmInputEnvelope
    set?: DealWhereUniqueInput | DealWhereUniqueInput[]
    disconnect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    delete?: DealWhereUniqueInput | DealWhereUniqueInput[]
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    update?: DealUpdateWithWhereUniqueWithoutFirmInput | DealUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: DealUpdateManyWithWhereWithoutFirmInput | DealUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: DealScalarWhereInput | DealScalarWhereInput[]
  }

  export type InvitationUpdateManyWithoutFirmNestedInput = {
    create?: XOR<InvitationCreateWithoutFirmInput, InvitationUncheckedCreateWithoutFirmInput> | InvitationCreateWithoutFirmInput[] | InvitationUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutFirmInput | InvitationCreateOrConnectWithoutFirmInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutFirmInput | InvitationUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: InvitationCreateManyFirmInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutFirmInput | InvitationUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutFirmInput | InvitationUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type TeamMemberUpdateManyWithoutFirmNestedInput = {
    create?: XOR<TeamMemberCreateWithoutFirmInput, TeamMemberUncheckedCreateWithoutFirmInput> | TeamMemberCreateWithoutFirmInput[] | TeamMemberUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutFirmInput | TeamMemberCreateOrConnectWithoutFirmInput[]
    upsert?: TeamMemberUpsertWithWhereUniqueWithoutFirmInput | TeamMemberUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: TeamMemberCreateManyFirmInputEnvelope
    set?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    disconnect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    delete?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    update?: TeamMemberUpdateWithWhereUniqueWithoutFirmInput | TeamMemberUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: TeamMemberUpdateManyWithWhereWithoutFirmInput | TeamMemberUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
  }

  export type UserUpdateManyWithoutFirmNestedInput = {
    create?: XOR<UserCreateWithoutFirmInput, UserUncheckedCreateWithoutFirmInput> | UserCreateWithoutFirmInput[] | UserUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFirmInput | UserCreateOrConnectWithoutFirmInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFirmInput | UserUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: UserCreateManyFirmInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFirmInput | UserUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFirmInput | UserUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutFirmNestedInput = {
    create?: XOR<TaskCreateWithoutFirmInput, TaskUncheckedCreateWithoutFirmInput> | TaskCreateWithoutFirmInput[] | TaskUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutFirmInput | TaskCreateOrConnectWithoutFirmInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutFirmInput | TaskUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: TaskCreateManyFirmInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutFirmInput | TaskUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutFirmInput | TaskUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ActivityLogUncheckedUpdateManyWithoutFirmNestedInput = {
    create?: XOR<ActivityLogCreateWithoutFirmInput, ActivityLogUncheckedCreateWithoutFirmInput> | ActivityLogCreateWithoutFirmInput[] | ActivityLogUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutFirmInput | ActivityLogCreateOrConnectWithoutFirmInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutFirmInput | ActivityLogUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: ActivityLogCreateManyFirmInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutFirmInput | ActivityLogUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutFirmInput | ActivityLogUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type DealUncheckedUpdateManyWithoutFirmNestedInput = {
    create?: XOR<DealCreateWithoutFirmInput, DealUncheckedCreateWithoutFirmInput> | DealCreateWithoutFirmInput[] | DealUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: DealCreateOrConnectWithoutFirmInput | DealCreateOrConnectWithoutFirmInput[]
    upsert?: DealUpsertWithWhereUniqueWithoutFirmInput | DealUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: DealCreateManyFirmInputEnvelope
    set?: DealWhereUniqueInput | DealWhereUniqueInput[]
    disconnect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    delete?: DealWhereUniqueInput | DealWhereUniqueInput[]
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    update?: DealUpdateWithWhereUniqueWithoutFirmInput | DealUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: DealUpdateManyWithWhereWithoutFirmInput | DealUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: DealScalarWhereInput | DealScalarWhereInput[]
  }

  export type InvitationUncheckedUpdateManyWithoutFirmNestedInput = {
    create?: XOR<InvitationCreateWithoutFirmInput, InvitationUncheckedCreateWithoutFirmInput> | InvitationCreateWithoutFirmInput[] | InvitationUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutFirmInput | InvitationCreateOrConnectWithoutFirmInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutFirmInput | InvitationUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: InvitationCreateManyFirmInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutFirmInput | InvitationUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutFirmInput | InvitationUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type TeamMemberUncheckedUpdateManyWithoutFirmNestedInput = {
    create?: XOR<TeamMemberCreateWithoutFirmInput, TeamMemberUncheckedCreateWithoutFirmInput> | TeamMemberCreateWithoutFirmInput[] | TeamMemberUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutFirmInput | TeamMemberCreateOrConnectWithoutFirmInput[]
    upsert?: TeamMemberUpsertWithWhereUniqueWithoutFirmInput | TeamMemberUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: TeamMemberCreateManyFirmInputEnvelope
    set?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    disconnect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    delete?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    update?: TeamMemberUpdateWithWhereUniqueWithoutFirmInput | TeamMemberUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: TeamMemberUpdateManyWithWhereWithoutFirmInput | TeamMemberUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutFirmNestedInput = {
    create?: XOR<UserCreateWithoutFirmInput, UserUncheckedCreateWithoutFirmInput> | UserCreateWithoutFirmInput[] | UserUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFirmInput | UserCreateOrConnectWithoutFirmInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFirmInput | UserUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: UserCreateManyFirmInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFirmInput | UserUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFirmInput | UserUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutFirmNestedInput = {
    create?: XOR<TaskCreateWithoutFirmInput, TaskUncheckedCreateWithoutFirmInput> | TaskCreateWithoutFirmInput[] | TaskUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutFirmInput | TaskCreateOrConnectWithoutFirmInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutFirmInput | TaskUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: TaskCreateManyFirmInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutFirmInput | TaskUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutFirmInput | TaskUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type FirmCreateNestedOneWithoutInvitationsInput = {
    create?: XOR<FirmCreateWithoutInvitationsInput, FirmUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: FirmCreateOrConnectWithoutInvitationsInput
    connect?: FirmWhereUniqueInput
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type FirmUpdateOneRequiredWithoutInvitationsNestedInput = {
    create?: XOR<FirmCreateWithoutInvitationsInput, FirmUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: FirmCreateOrConnectWithoutInvitationsInput
    upsert?: FirmUpsertWithoutInvitationsInput
    connect?: FirmWhereUniqueInput
    update?: XOR<XOR<FirmUpdateToOneWithWhereWithoutInvitationsInput, FirmUpdateWithoutInvitationsInput>, FirmUncheckedUpdateWithoutInvitationsInput>
  }

  export type TeamMemberCreateNestedOneWithoutUserInput = {
    create?: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput>
    connectOrCreate?: TeamMemberCreateOrConnectWithoutUserInput
    connect?: TeamMemberWhereUniqueInput
  }

  export type FirmCreateNestedOneWithoutUsersInput = {
    create?: XOR<FirmCreateWithoutUsersInput, FirmUncheckedCreateWithoutUsersInput>
    connectOrCreate?: FirmCreateOrConnectWithoutUsersInput
    connect?: FirmWhereUniqueInput
  }

  export type TeamMemberUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput>
    connectOrCreate?: TeamMemberCreateOrConnectWithoutUserInput
    connect?: TeamMemberWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type TeamMemberUpdateOneWithoutUserNestedInput = {
    create?: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput>
    connectOrCreate?: TeamMemberCreateOrConnectWithoutUserInput
    upsert?: TeamMemberUpsertWithoutUserInput
    disconnect?: TeamMemberWhereInput | boolean
    delete?: TeamMemberWhereInput | boolean
    connect?: TeamMemberWhereUniqueInput
    update?: XOR<XOR<TeamMemberUpdateToOneWithWhereWithoutUserInput, TeamMemberUpdateWithoutUserInput>, TeamMemberUncheckedUpdateWithoutUserInput>
  }

  export type FirmUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<FirmCreateWithoutUsersInput, FirmUncheckedCreateWithoutUsersInput>
    connectOrCreate?: FirmCreateOrConnectWithoutUsersInput
    upsert?: FirmUpsertWithoutUsersInput
    connect?: FirmWhereUniqueInput
    update?: XOR<XOR<FirmUpdateToOneWithWhereWithoutUsersInput, FirmUpdateWithoutUsersInput>, FirmUncheckedUpdateWithoutUsersInput>
  }

  export type TeamMemberUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput>
    connectOrCreate?: TeamMemberCreateOrConnectWithoutUserInput
    upsert?: TeamMemberUpsertWithoutUserInput
    disconnect?: TeamMemberWhereInput | boolean
    delete?: TeamMemberWhereInput | boolean
    connect?: TeamMemberWhereUniqueInput
    update?: XOR<XOR<TeamMemberUpdateToOneWithWhereWithoutUserInput, TeamMemberUpdateWithoutUserInput>, TeamMemberUncheckedUpdateWithoutUserInput>
  }

  export type TeamMemberCreatefirmIdsInput = {
    set: string[]
  }

  export type TeamMemberCreateNestedOneWithoutReportsInput = {
    create?: XOR<TeamMemberCreateWithoutReportsInput, TeamMemberUncheckedCreateWithoutReportsInput>
    connectOrCreate?: TeamMemberCreateOrConnectWithoutReportsInput
    connect?: TeamMemberWhereUniqueInput
  }

  export type TeamMemberCreateNestedManyWithoutManagerInput = {
    create?: XOR<TeamMemberCreateWithoutManagerInput, TeamMemberUncheckedCreateWithoutManagerInput> | TeamMemberCreateWithoutManagerInput[] | TeamMemberUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutManagerInput | TeamMemberCreateOrConnectWithoutManagerInput[]
    createMany?: TeamMemberCreateManyManagerInputEnvelope
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
  }

  export type DealCreateNestedManyWithoutTeamMemberInput = {
    create?: XOR<DealCreateWithoutTeamMemberInput, DealUncheckedCreateWithoutTeamMemberInput> | DealCreateWithoutTeamMemberInput[] | DealUncheckedCreateWithoutTeamMemberInput[]
    connectOrCreate?: DealCreateOrConnectWithoutTeamMemberInput | DealCreateOrConnectWithoutTeamMemberInput[]
    createMany?: DealCreateManyTeamMemberInputEnvelope
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutAssigneeInput = {
    create?: XOR<TaskCreateWithoutAssigneeInput, TaskUncheckedCreateWithoutAssigneeInput> | TaskCreateWithoutAssigneeInput[] | TaskUncheckedCreateWithoutAssigneeInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutAssigneeInput | TaskCreateOrConnectWithoutAssigneeInput[]
    createMany?: TaskCreateManyAssigneeInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type FirmCreateNestedOneWithoutTeamMembersInput = {
    create?: XOR<FirmCreateWithoutTeamMembersInput, FirmUncheckedCreateWithoutTeamMembersInput>
    connectOrCreate?: FirmCreateOrConnectWithoutTeamMembersInput
    connect?: FirmWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProfessionalProfileInput = {
    create?: XOR<UserCreateWithoutProfessionalProfileInput, UserUncheckedCreateWithoutProfessionalProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfessionalProfileInput
    connect?: UserWhereUniqueInput
  }

  export type AssetFileCreateNestedManyWithoutTeamMemberInput = {
    create?: XOR<AssetFileCreateWithoutTeamMemberInput, AssetFileUncheckedCreateWithoutTeamMemberInput> | AssetFileCreateWithoutTeamMemberInput[] | AssetFileUncheckedCreateWithoutTeamMemberInput[]
    connectOrCreate?: AssetFileCreateOrConnectWithoutTeamMemberInput | AssetFileCreateOrConnectWithoutTeamMemberInput[]
    createMany?: AssetFileCreateManyTeamMemberInputEnvelope
    connect?: AssetFileWhereUniqueInput | AssetFileWhereUniqueInput[]
  }

  export type TeamMemberUncheckedCreateNestedManyWithoutManagerInput = {
    create?: XOR<TeamMemberCreateWithoutManagerInput, TeamMemberUncheckedCreateWithoutManagerInput> | TeamMemberCreateWithoutManagerInput[] | TeamMemberUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutManagerInput | TeamMemberCreateOrConnectWithoutManagerInput[]
    createMany?: TeamMemberCreateManyManagerInputEnvelope
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
  }

  export type DealUncheckedCreateNestedManyWithoutTeamMemberInput = {
    create?: XOR<DealCreateWithoutTeamMemberInput, DealUncheckedCreateWithoutTeamMemberInput> | DealCreateWithoutTeamMemberInput[] | DealUncheckedCreateWithoutTeamMemberInput[]
    connectOrCreate?: DealCreateOrConnectWithoutTeamMemberInput | DealCreateOrConnectWithoutTeamMemberInput[]
    createMany?: DealCreateManyTeamMemberInputEnvelope
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutAssigneeInput = {
    create?: XOR<TaskCreateWithoutAssigneeInput, TaskUncheckedCreateWithoutAssigneeInput> | TaskCreateWithoutAssigneeInput[] | TaskUncheckedCreateWithoutAssigneeInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutAssigneeInput | TaskCreateOrConnectWithoutAssigneeInput[]
    createMany?: TaskCreateManyAssigneeInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type AssetFileUncheckedCreateNestedManyWithoutTeamMemberInput = {
    create?: XOR<AssetFileCreateWithoutTeamMemberInput, AssetFileUncheckedCreateWithoutTeamMemberInput> | AssetFileCreateWithoutTeamMemberInput[] | AssetFileUncheckedCreateWithoutTeamMemberInput[]
    connectOrCreate?: AssetFileCreateOrConnectWithoutTeamMemberInput | AssetFileCreateOrConnectWithoutTeamMemberInput[]
    createMany?: AssetFileCreateManyTeamMemberInputEnvelope
    connect?: AssetFileWhereUniqueInput | AssetFileWhereUniqueInput[]
  }

  export type TeamMemberUpdatefirmIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type TeamMemberUpdateOneWithoutReportsNestedInput = {
    create?: XOR<TeamMemberCreateWithoutReportsInput, TeamMemberUncheckedCreateWithoutReportsInput>
    connectOrCreate?: TeamMemberCreateOrConnectWithoutReportsInput
    upsert?: TeamMemberUpsertWithoutReportsInput
    disconnect?: TeamMemberWhereInput | boolean
    delete?: TeamMemberWhereInput | boolean
    connect?: TeamMemberWhereUniqueInput
    update?: XOR<XOR<TeamMemberUpdateToOneWithWhereWithoutReportsInput, TeamMemberUpdateWithoutReportsInput>, TeamMemberUncheckedUpdateWithoutReportsInput>
  }

  export type TeamMemberUpdateManyWithoutManagerNestedInput = {
    create?: XOR<TeamMemberCreateWithoutManagerInput, TeamMemberUncheckedCreateWithoutManagerInput> | TeamMemberCreateWithoutManagerInput[] | TeamMemberUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutManagerInput | TeamMemberCreateOrConnectWithoutManagerInput[]
    upsert?: TeamMemberUpsertWithWhereUniqueWithoutManagerInput | TeamMemberUpsertWithWhereUniqueWithoutManagerInput[]
    createMany?: TeamMemberCreateManyManagerInputEnvelope
    set?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    disconnect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    delete?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    update?: TeamMemberUpdateWithWhereUniqueWithoutManagerInput | TeamMemberUpdateWithWhereUniqueWithoutManagerInput[]
    updateMany?: TeamMemberUpdateManyWithWhereWithoutManagerInput | TeamMemberUpdateManyWithWhereWithoutManagerInput[]
    deleteMany?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
  }

  export type DealUpdateManyWithoutTeamMemberNestedInput = {
    create?: XOR<DealCreateWithoutTeamMemberInput, DealUncheckedCreateWithoutTeamMemberInput> | DealCreateWithoutTeamMemberInput[] | DealUncheckedCreateWithoutTeamMemberInput[]
    connectOrCreate?: DealCreateOrConnectWithoutTeamMemberInput | DealCreateOrConnectWithoutTeamMemberInput[]
    upsert?: DealUpsertWithWhereUniqueWithoutTeamMemberInput | DealUpsertWithWhereUniqueWithoutTeamMemberInput[]
    createMany?: DealCreateManyTeamMemberInputEnvelope
    set?: DealWhereUniqueInput | DealWhereUniqueInput[]
    disconnect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    delete?: DealWhereUniqueInput | DealWhereUniqueInput[]
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    update?: DealUpdateWithWhereUniqueWithoutTeamMemberInput | DealUpdateWithWhereUniqueWithoutTeamMemberInput[]
    updateMany?: DealUpdateManyWithWhereWithoutTeamMemberInput | DealUpdateManyWithWhereWithoutTeamMemberInput[]
    deleteMany?: DealScalarWhereInput | DealScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutAssigneeNestedInput = {
    create?: XOR<TaskCreateWithoutAssigneeInput, TaskUncheckedCreateWithoutAssigneeInput> | TaskCreateWithoutAssigneeInput[] | TaskUncheckedCreateWithoutAssigneeInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutAssigneeInput | TaskCreateOrConnectWithoutAssigneeInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutAssigneeInput | TaskUpsertWithWhereUniqueWithoutAssigneeInput[]
    createMany?: TaskCreateManyAssigneeInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutAssigneeInput | TaskUpdateWithWhereUniqueWithoutAssigneeInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutAssigneeInput | TaskUpdateManyWithWhereWithoutAssigneeInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type FirmUpdateOneRequiredWithoutTeamMembersNestedInput = {
    create?: XOR<FirmCreateWithoutTeamMembersInput, FirmUncheckedCreateWithoutTeamMembersInput>
    connectOrCreate?: FirmCreateOrConnectWithoutTeamMembersInput
    upsert?: FirmUpsertWithoutTeamMembersInput
    connect?: FirmWhereUniqueInput
    update?: XOR<XOR<FirmUpdateToOneWithWhereWithoutTeamMembersInput, FirmUpdateWithoutTeamMembersInput>, FirmUncheckedUpdateWithoutTeamMembersInput>
  }

  export type UserUpdateOneWithoutProfessionalProfileNestedInput = {
    create?: XOR<UserCreateWithoutProfessionalProfileInput, UserUncheckedCreateWithoutProfessionalProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfessionalProfileInput
    upsert?: UserUpsertWithoutProfessionalProfileInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfessionalProfileInput, UserUpdateWithoutProfessionalProfileInput>, UserUncheckedUpdateWithoutProfessionalProfileInput>
  }

  export type AssetFileUpdateManyWithoutTeamMemberNestedInput = {
    create?: XOR<AssetFileCreateWithoutTeamMemberInput, AssetFileUncheckedCreateWithoutTeamMemberInput> | AssetFileCreateWithoutTeamMemberInput[] | AssetFileUncheckedCreateWithoutTeamMemberInput[]
    connectOrCreate?: AssetFileCreateOrConnectWithoutTeamMemberInput | AssetFileCreateOrConnectWithoutTeamMemberInput[]
    upsert?: AssetFileUpsertWithWhereUniqueWithoutTeamMemberInput | AssetFileUpsertWithWhereUniqueWithoutTeamMemberInput[]
    createMany?: AssetFileCreateManyTeamMemberInputEnvelope
    set?: AssetFileWhereUniqueInput | AssetFileWhereUniqueInput[]
    disconnect?: AssetFileWhereUniqueInput | AssetFileWhereUniqueInput[]
    delete?: AssetFileWhereUniqueInput | AssetFileWhereUniqueInput[]
    connect?: AssetFileWhereUniqueInput | AssetFileWhereUniqueInput[]
    update?: AssetFileUpdateWithWhereUniqueWithoutTeamMemberInput | AssetFileUpdateWithWhereUniqueWithoutTeamMemberInput[]
    updateMany?: AssetFileUpdateManyWithWhereWithoutTeamMemberInput | AssetFileUpdateManyWithWhereWithoutTeamMemberInput[]
    deleteMany?: AssetFileScalarWhereInput | AssetFileScalarWhereInput[]
  }

  export type TeamMemberUncheckedUpdateManyWithoutManagerNestedInput = {
    create?: XOR<TeamMemberCreateWithoutManagerInput, TeamMemberUncheckedCreateWithoutManagerInput> | TeamMemberCreateWithoutManagerInput[] | TeamMemberUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutManagerInput | TeamMemberCreateOrConnectWithoutManagerInput[]
    upsert?: TeamMemberUpsertWithWhereUniqueWithoutManagerInput | TeamMemberUpsertWithWhereUniqueWithoutManagerInput[]
    createMany?: TeamMemberCreateManyManagerInputEnvelope
    set?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    disconnect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    delete?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    update?: TeamMemberUpdateWithWhereUniqueWithoutManagerInput | TeamMemberUpdateWithWhereUniqueWithoutManagerInput[]
    updateMany?: TeamMemberUpdateManyWithWhereWithoutManagerInput | TeamMemberUpdateManyWithWhereWithoutManagerInput[]
    deleteMany?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
  }

  export type DealUncheckedUpdateManyWithoutTeamMemberNestedInput = {
    create?: XOR<DealCreateWithoutTeamMemberInput, DealUncheckedCreateWithoutTeamMemberInput> | DealCreateWithoutTeamMemberInput[] | DealUncheckedCreateWithoutTeamMemberInput[]
    connectOrCreate?: DealCreateOrConnectWithoutTeamMemberInput | DealCreateOrConnectWithoutTeamMemberInput[]
    upsert?: DealUpsertWithWhereUniqueWithoutTeamMemberInput | DealUpsertWithWhereUniqueWithoutTeamMemberInput[]
    createMany?: DealCreateManyTeamMemberInputEnvelope
    set?: DealWhereUniqueInput | DealWhereUniqueInput[]
    disconnect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    delete?: DealWhereUniqueInput | DealWhereUniqueInput[]
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    update?: DealUpdateWithWhereUniqueWithoutTeamMemberInput | DealUpdateWithWhereUniqueWithoutTeamMemberInput[]
    updateMany?: DealUpdateManyWithWhereWithoutTeamMemberInput | DealUpdateManyWithWhereWithoutTeamMemberInput[]
    deleteMany?: DealScalarWhereInput | DealScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutAssigneeNestedInput = {
    create?: XOR<TaskCreateWithoutAssigneeInput, TaskUncheckedCreateWithoutAssigneeInput> | TaskCreateWithoutAssigneeInput[] | TaskUncheckedCreateWithoutAssigneeInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutAssigneeInput | TaskCreateOrConnectWithoutAssigneeInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutAssigneeInput | TaskUpsertWithWhereUniqueWithoutAssigneeInput[]
    createMany?: TaskCreateManyAssigneeInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutAssigneeInput | TaskUpdateWithWhereUniqueWithoutAssigneeInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutAssigneeInput | TaskUpdateManyWithWhereWithoutAssigneeInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type AssetFileUncheckedUpdateManyWithoutTeamMemberNestedInput = {
    create?: XOR<AssetFileCreateWithoutTeamMemberInput, AssetFileUncheckedCreateWithoutTeamMemberInput> | AssetFileCreateWithoutTeamMemberInput[] | AssetFileUncheckedCreateWithoutTeamMemberInput[]
    connectOrCreate?: AssetFileCreateOrConnectWithoutTeamMemberInput | AssetFileCreateOrConnectWithoutTeamMemberInput[]
    upsert?: AssetFileUpsertWithWhereUniqueWithoutTeamMemberInput | AssetFileUpsertWithWhereUniqueWithoutTeamMemberInput[]
    createMany?: AssetFileCreateManyTeamMemberInputEnvelope
    set?: AssetFileWhereUniqueInput | AssetFileWhereUniqueInput[]
    disconnect?: AssetFileWhereUniqueInput | AssetFileWhereUniqueInput[]
    delete?: AssetFileWhereUniqueInput | AssetFileWhereUniqueInput[]
    connect?: AssetFileWhereUniqueInput | AssetFileWhereUniqueInput[]
    update?: AssetFileUpdateWithWhereUniqueWithoutTeamMemberInput | AssetFileUpdateWithWhereUniqueWithoutTeamMemberInput[]
    updateMany?: AssetFileUpdateManyWithWhereWithoutTeamMemberInput | AssetFileUpdateManyWithWhereWithoutTeamMemberInput[]
    deleteMany?: AssetFileScalarWhereInput | AssetFileScalarWhereInput[]
  }

  export type TeamMemberCreateNestedOneWithoutFilesInput = {
    create?: XOR<TeamMemberCreateWithoutFilesInput, TeamMemberUncheckedCreateWithoutFilesInput>
    connectOrCreate?: TeamMemberCreateOrConnectWithoutFilesInput
    connect?: TeamMemberWhereUniqueInput
  }

  export type TeamMemberUpdateOneRequiredWithoutFilesNestedInput = {
    create?: XOR<TeamMemberCreateWithoutFilesInput, TeamMemberUncheckedCreateWithoutFilesInput>
    connectOrCreate?: TeamMemberCreateOrConnectWithoutFilesInput
    upsert?: TeamMemberUpsertWithoutFilesInput
    connect?: TeamMemberWhereUniqueInput
    update?: XOR<XOR<TeamMemberUpdateToOneWithWhereWithoutFilesInput, TeamMemberUpdateWithoutFilesInput>, TeamMemberUncheckedUpdateWithoutFilesInput>
  }

  export type DealCreateimagesInput = {
    set: string[]
  }

  export type DealCreateteamMemberIdsInput = {
    set: string[]
  }

  export type FirmCreateNestedOneWithoutDealsInput = {
    create?: XOR<FirmCreateWithoutDealsInput, FirmUncheckedCreateWithoutDealsInput>
    connectOrCreate?: FirmCreateOrConnectWithoutDealsInput
    connect?: FirmWhereUniqueInput
  }

  export type TeamMemberCreateNestedOneWithoutDealsInput = {
    create?: XOR<TeamMemberCreateWithoutDealsInput, TeamMemberUncheckedCreateWithoutDealsInput>
    connectOrCreate?: TeamMemberCreateOrConnectWithoutDealsInput
    connect?: TeamMemberWhereUniqueInput
  }

  export type EnumAssetTypeFieldUpdateOperationsInput = {
    set?: $Enums.AssetType
  }

  export type EnumStrategyFieldUpdateOperationsInput = {
    set?: $Enums.Strategy
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DealUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DealUpdateteamMemberIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type FirmUpdateOneRequiredWithoutDealsNestedInput = {
    create?: XOR<FirmCreateWithoutDealsInput, FirmUncheckedCreateWithoutDealsInput>
    connectOrCreate?: FirmCreateOrConnectWithoutDealsInput
    upsert?: FirmUpsertWithoutDealsInput
    connect?: FirmWhereUniqueInput
    update?: XOR<XOR<FirmUpdateToOneWithWhereWithoutDealsInput, FirmUpdateWithoutDealsInput>, FirmUncheckedUpdateWithoutDealsInput>
  }

  export type TeamMemberUpdateOneWithoutDealsNestedInput = {
    create?: XOR<TeamMemberCreateWithoutDealsInput, TeamMemberUncheckedCreateWithoutDealsInput>
    connectOrCreate?: TeamMemberCreateOrConnectWithoutDealsInput
    upsert?: TeamMemberUpsertWithoutDealsInput
    disconnect?: TeamMemberWhereInput | boolean
    delete?: TeamMemberWhereInput | boolean
    connect?: TeamMemberWhereUniqueInput
    update?: XOR<XOR<TeamMemberUpdateToOneWithWhereWithoutDealsInput, TeamMemberUpdateWithoutDealsInput>, TeamMemberUncheckedUpdateWithoutDealsInput>
  }

  export type FirmCreateNestedOneWithoutActivityLogsInput = {
    create?: XOR<FirmCreateWithoutActivityLogsInput, FirmUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: FirmCreateOrConnectWithoutActivityLogsInput
    connect?: FirmWhereUniqueInput
  }

  export type FirmUpdateOneWithoutActivityLogsNestedInput = {
    create?: XOR<FirmCreateWithoutActivityLogsInput, FirmUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: FirmCreateOrConnectWithoutActivityLogsInput
    upsert?: FirmUpsertWithoutActivityLogsInput
    disconnect?: FirmWhereInput | boolean
    delete?: FirmWhereInput | boolean
    connect?: FirmWhereUniqueInput
    update?: XOR<XOR<FirmUpdateToOneWithWhereWithoutActivityLogsInput, FirmUpdateWithoutActivityLogsInput>, FirmUncheckedUpdateWithoutActivityLogsInput>
  }

  export type FirmCreateNestedOneWithoutTasksInput = {
    create?: XOR<FirmCreateWithoutTasksInput, FirmUncheckedCreateWithoutTasksInput>
    connectOrCreate?: FirmCreateOrConnectWithoutTasksInput
    connect?: FirmWhereUniqueInput
  }

  export type TeamMemberCreateNestedOneWithoutTasksInput = {
    create?: XOR<TeamMemberCreateWithoutTasksInput, TeamMemberUncheckedCreateWithoutTasksInput>
    connectOrCreate?: TeamMemberCreateOrConnectWithoutTasksInput
    connect?: TeamMemberWhereUniqueInput
  }

  export type FirmUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<FirmCreateWithoutTasksInput, FirmUncheckedCreateWithoutTasksInput>
    connectOrCreate?: FirmCreateOrConnectWithoutTasksInput
    upsert?: FirmUpsertWithoutTasksInput
    connect?: FirmWhereUniqueInput
    update?: XOR<XOR<FirmUpdateToOneWithWhereWithoutTasksInput, FirmUpdateWithoutTasksInput>, FirmUncheckedUpdateWithoutTasksInput>
  }

  export type TeamMemberUpdateOneWithoutTasksNestedInput = {
    create?: XOR<TeamMemberCreateWithoutTasksInput, TeamMemberUncheckedCreateWithoutTasksInput>
    connectOrCreate?: TeamMemberCreateOrConnectWithoutTasksInput
    upsert?: TeamMemberUpsertWithoutTasksInput
    disconnect?: TeamMemberWhereInput | boolean
    delete?: TeamMemberWhereInput | boolean
    connect?: TeamMemberWhereUniqueInput
    update?: XOR<XOR<TeamMemberUpdateToOneWithWhereWithoutTasksInput, TeamMemberUpdateWithoutTasksInput>, TeamMemberUncheckedUpdateWithoutTasksInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumAssetTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetType | EnumAssetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetTypeFilter<$PrismaModel> | $Enums.AssetType
  }

  export type NestedEnumStrategyFilter<$PrismaModel = never> = {
    equals?: $Enums.Strategy | EnumStrategyFieldRefInput<$PrismaModel>
    in?: $Enums.Strategy[] | ListEnumStrategyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Strategy[] | ListEnumStrategyFieldRefInput<$PrismaModel>
    not?: NestedEnumStrategyFilter<$PrismaModel> | $Enums.Strategy
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAssetTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetType | EnumAssetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssetType[] | ListEnumAssetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssetTypeWithAggregatesFilter<$PrismaModel> | $Enums.AssetType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssetTypeFilter<$PrismaModel>
    _max?: NestedEnumAssetTypeFilter<$PrismaModel>
  }

  export type NestedEnumStrategyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Strategy | EnumStrategyFieldRefInput<$PrismaModel>
    in?: $Enums.Strategy[] | ListEnumStrategyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Strategy[] | ListEnumStrategyFieldRefInput<$PrismaModel>
    not?: NestedEnumStrategyWithAggregatesFilter<$PrismaModel> | $Enums.Strategy
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStrategyFilter<$PrismaModel>
    _max?: NestedEnumStrategyFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ActivityLogCreateWithoutFirmInput = {
    id?: string
    type: string
    title: string
    timestamp?: Date | string
    dealId?: string | null
    userId?: string | null
    memberId?: string | null
    performedByEmail?: string | null
  }

  export type ActivityLogUncheckedCreateWithoutFirmInput = {
    id?: string
    type: string
    title: string
    timestamp?: Date | string
    dealId?: string | null
    userId?: string | null
    memberId?: string | null
    performedByEmail?: string | null
  }

  export type ActivityLogCreateOrConnectWithoutFirmInput = {
    where: ActivityLogWhereUniqueInput
    create: XOR<ActivityLogCreateWithoutFirmInput, ActivityLogUncheckedCreateWithoutFirmInput>
  }

  export type ActivityLogCreateManyFirmInputEnvelope = {
    data: ActivityLogCreateManyFirmInput | ActivityLogCreateManyFirmInput[]
    skipDuplicates?: boolean
  }

  export type DealCreateWithoutFirmInput = {
    id?: string
    address: string
    assetType: $Enums.AssetType
    strategy: $Enums.Strategy
    purchaseAmount?: number | null
    financedAmount?: number | null
    stillImageURL?: string | null
    generatedVideoURL?: string | null
    isPublic?: boolean
    capRate?: number | null
    sqFt?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    arv?: number | null
    context?: string | null
    financingType?: string | null
    images?: DealCreateimagesInput | string[]
    investmentOverview?: string | null
    rehabAmount?: number | null
    teamMemberIds?: DealCreateteamMemberIdsInput | string[]
    sortOrder?: number
    teamMember?: TeamMemberCreateNestedOneWithoutDealsInput
  }

  export type DealUncheckedCreateWithoutFirmInput = {
    id?: string
    address: string
    assetType: $Enums.AssetType
    strategy: $Enums.Strategy
    purchaseAmount?: number | null
    financedAmount?: number | null
    stillImageURL?: string | null
    generatedVideoURL?: string | null
    isPublic?: boolean
    capRate?: number | null
    sqFt?: number | null
    teamMemberId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    arv?: number | null
    context?: string | null
    financingType?: string | null
    images?: DealCreateimagesInput | string[]
    investmentOverview?: string | null
    rehabAmount?: number | null
    teamMemberIds?: DealCreateteamMemberIdsInput | string[]
    sortOrder?: number
  }

  export type DealCreateOrConnectWithoutFirmInput = {
    where: DealWhereUniqueInput
    create: XOR<DealCreateWithoutFirmInput, DealUncheckedCreateWithoutFirmInput>
  }

  export type DealCreateManyFirmInputEnvelope = {
    data: DealCreateManyFirmInput | DealCreateManyFirmInput[]
    skipDuplicates?: boolean
  }

  export type InvitationCreateWithoutFirmInput = {
    id?: string
    email: string
    token: string
    role?: $Enums.UserRole
    isUsed?: boolean
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type InvitationUncheckedCreateWithoutFirmInput = {
    id?: string
    email: string
    token: string
    role?: $Enums.UserRole
    isUsed?: boolean
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type InvitationCreateOrConnectWithoutFirmInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutFirmInput, InvitationUncheckedCreateWithoutFirmInput>
  }

  export type InvitationCreateManyFirmInputEnvelope = {
    data: InvitationCreateManyFirmInput | InvitationCreateManyFirmInput[]
    skipDuplicates?: boolean
  }

  export type TeamMemberCreateWithoutFirmInput = {
    id?: string
    name: string
    slug: string
    role: string
    email?: string | null
    imageURL?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bio?: string | null
    firmIds?: TeamMemberCreatefirmIdsInput | string[]
    heroMediaUrl?: string | null
    linkedInUrl?: string | null
    phoneNumber?: string | null
    sortOrder?: number
    department?: string | null
    manager?: TeamMemberCreateNestedOneWithoutReportsInput
    reports?: TeamMemberCreateNestedManyWithoutManagerInput
    deals?: DealCreateNestedManyWithoutTeamMemberInput
    tasks?: TaskCreateNestedManyWithoutAssigneeInput
    user?: UserCreateNestedOneWithoutProfessionalProfileInput
    files?: AssetFileCreateNestedManyWithoutTeamMemberInput
  }

  export type TeamMemberUncheckedCreateWithoutFirmInput = {
    id?: string
    name: string
    slug: string
    role: string
    email?: string | null
    imageURL?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bio?: string | null
    firmIds?: TeamMemberCreatefirmIdsInput | string[]
    heroMediaUrl?: string | null
    linkedInUrl?: string | null
    phoneNumber?: string | null
    sortOrder?: number
    userId?: string | null
    department?: string | null
    managerId?: string | null
    reports?: TeamMemberUncheckedCreateNestedManyWithoutManagerInput
    deals?: DealUncheckedCreateNestedManyWithoutTeamMemberInput
    tasks?: TaskUncheckedCreateNestedManyWithoutAssigneeInput
    files?: AssetFileUncheckedCreateNestedManyWithoutTeamMemberInput
  }

  export type TeamMemberCreateOrConnectWithoutFirmInput = {
    where: TeamMemberWhereUniqueInput
    create: XOR<TeamMemberCreateWithoutFirmInput, TeamMemberUncheckedCreateWithoutFirmInput>
  }

  export type TeamMemberCreateManyFirmInputEnvelope = {
    data: TeamMemberCreateManyFirmInput | TeamMemberCreateManyFirmInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutFirmInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    name?: string | null
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
    professionalProfile?: TeamMemberCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFirmInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    name?: string | null
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
    professionalProfile?: TeamMemberUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFirmInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFirmInput, UserUncheckedCreateWithoutFirmInput>
  }

  export type UserCreateManyFirmInputEnvelope = {
    data: UserCreateManyFirmInput | UserCreateManyFirmInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutFirmInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    priority?: string
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignee?: TeamMemberCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutFirmInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    priority?: string
    assigneeId?: string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateOrConnectWithoutFirmInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutFirmInput, TaskUncheckedCreateWithoutFirmInput>
  }

  export type TaskCreateManyFirmInputEnvelope = {
    data: TaskCreateManyFirmInput | TaskCreateManyFirmInput[]
    skipDuplicates?: boolean
  }

  export type ActivityLogUpsertWithWhereUniqueWithoutFirmInput = {
    where: ActivityLogWhereUniqueInput
    update: XOR<ActivityLogUpdateWithoutFirmInput, ActivityLogUncheckedUpdateWithoutFirmInput>
    create: XOR<ActivityLogCreateWithoutFirmInput, ActivityLogUncheckedCreateWithoutFirmInput>
  }

  export type ActivityLogUpdateWithWhereUniqueWithoutFirmInput = {
    where: ActivityLogWhereUniqueInput
    data: XOR<ActivityLogUpdateWithoutFirmInput, ActivityLogUncheckedUpdateWithoutFirmInput>
  }

  export type ActivityLogUpdateManyWithWhereWithoutFirmInput = {
    where: ActivityLogScalarWhereInput
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyWithoutFirmInput>
  }

  export type ActivityLogScalarWhereInput = {
    AND?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    OR?: ActivityLogScalarWhereInput[]
    NOT?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    type?: StringFilter<"ActivityLog"> | string
    title?: StringFilter<"ActivityLog"> | string
    timestamp?: DateTimeFilter<"ActivityLog"> | Date | string
    firmId?: StringNullableFilter<"ActivityLog"> | string | null
    dealId?: StringNullableFilter<"ActivityLog"> | string | null
    userId?: StringNullableFilter<"ActivityLog"> | string | null
    memberId?: StringNullableFilter<"ActivityLog"> | string | null
    performedByEmail?: StringNullableFilter<"ActivityLog"> | string | null
  }

  export type DealUpsertWithWhereUniqueWithoutFirmInput = {
    where: DealWhereUniqueInput
    update: XOR<DealUpdateWithoutFirmInput, DealUncheckedUpdateWithoutFirmInput>
    create: XOR<DealCreateWithoutFirmInput, DealUncheckedCreateWithoutFirmInput>
  }

  export type DealUpdateWithWhereUniqueWithoutFirmInput = {
    where: DealWhereUniqueInput
    data: XOR<DealUpdateWithoutFirmInput, DealUncheckedUpdateWithoutFirmInput>
  }

  export type DealUpdateManyWithWhereWithoutFirmInput = {
    where: DealScalarWhereInput
    data: XOR<DealUpdateManyMutationInput, DealUncheckedUpdateManyWithoutFirmInput>
  }

  export type DealScalarWhereInput = {
    AND?: DealScalarWhereInput | DealScalarWhereInput[]
    OR?: DealScalarWhereInput[]
    NOT?: DealScalarWhereInput | DealScalarWhereInput[]
    id?: StringFilter<"Deal"> | string
    address?: StringFilter<"Deal"> | string
    assetType?: EnumAssetTypeFilter<"Deal"> | $Enums.AssetType
    strategy?: EnumStrategyFilter<"Deal"> | $Enums.Strategy
    purchaseAmount?: FloatNullableFilter<"Deal"> | number | null
    financedAmount?: FloatNullableFilter<"Deal"> | number | null
    stillImageURL?: StringNullableFilter<"Deal"> | string | null
    generatedVideoURL?: StringNullableFilter<"Deal"> | string | null
    isPublic?: BoolFilter<"Deal"> | boolean
    capRate?: FloatNullableFilter<"Deal"> | number | null
    sqFt?: FloatNullableFilter<"Deal"> | number | null
    firmId?: StringFilter<"Deal"> | string
    teamMemberId?: StringNullableFilter<"Deal"> | string | null
    createdAt?: DateTimeFilter<"Deal"> | Date | string
    updatedAt?: DateTimeFilter<"Deal"> | Date | string
    arv?: FloatNullableFilter<"Deal"> | number | null
    context?: StringNullableFilter<"Deal"> | string | null
    financingType?: StringNullableFilter<"Deal"> | string | null
    images?: StringNullableListFilter<"Deal">
    investmentOverview?: StringNullableFilter<"Deal"> | string | null
    rehabAmount?: FloatNullableFilter<"Deal"> | number | null
    teamMemberIds?: StringNullableListFilter<"Deal">
    sortOrder?: IntFilter<"Deal"> | number
  }

  export type InvitationUpsertWithWhereUniqueWithoutFirmInput = {
    where: InvitationWhereUniqueInput
    update: XOR<InvitationUpdateWithoutFirmInput, InvitationUncheckedUpdateWithoutFirmInput>
    create: XOR<InvitationCreateWithoutFirmInput, InvitationUncheckedCreateWithoutFirmInput>
  }

  export type InvitationUpdateWithWhereUniqueWithoutFirmInput = {
    where: InvitationWhereUniqueInput
    data: XOR<InvitationUpdateWithoutFirmInput, InvitationUncheckedUpdateWithoutFirmInput>
  }

  export type InvitationUpdateManyWithWhereWithoutFirmInput = {
    where: InvitationScalarWhereInput
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyWithoutFirmInput>
  }

  export type InvitationScalarWhereInput = {
    AND?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
    OR?: InvitationScalarWhereInput[]
    NOT?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
    id?: StringFilter<"Invitation"> | string
    email?: StringFilter<"Invitation"> | string
    token?: StringFilter<"Invitation"> | string
    role?: EnumUserRoleFilter<"Invitation"> | $Enums.UserRole
    firmId?: StringFilter<"Invitation"> | string
    isUsed?: BoolFilter<"Invitation"> | boolean
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
    expiresAt?: DateTimeFilter<"Invitation"> | Date | string
  }

  export type TeamMemberUpsertWithWhereUniqueWithoutFirmInput = {
    where: TeamMemberWhereUniqueInput
    update: XOR<TeamMemberUpdateWithoutFirmInput, TeamMemberUncheckedUpdateWithoutFirmInput>
    create: XOR<TeamMemberCreateWithoutFirmInput, TeamMemberUncheckedCreateWithoutFirmInput>
  }

  export type TeamMemberUpdateWithWhereUniqueWithoutFirmInput = {
    where: TeamMemberWhereUniqueInput
    data: XOR<TeamMemberUpdateWithoutFirmInput, TeamMemberUncheckedUpdateWithoutFirmInput>
  }

  export type TeamMemberUpdateManyWithWhereWithoutFirmInput = {
    where: TeamMemberScalarWhereInput
    data: XOR<TeamMemberUpdateManyMutationInput, TeamMemberUncheckedUpdateManyWithoutFirmInput>
  }

  export type TeamMemberScalarWhereInput = {
    AND?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
    OR?: TeamMemberScalarWhereInput[]
    NOT?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
    id?: StringFilter<"TeamMember"> | string
    name?: StringFilter<"TeamMember"> | string
    slug?: StringFilter<"TeamMember"> | string
    role?: StringFilter<"TeamMember"> | string
    email?: StringNullableFilter<"TeamMember"> | string | null
    imageURL?: StringNullableFilter<"TeamMember"> | string | null
    firmId?: StringFilter<"TeamMember"> | string
    createdAt?: DateTimeFilter<"TeamMember"> | Date | string
    updatedAt?: DateTimeFilter<"TeamMember"> | Date | string
    bio?: StringNullableFilter<"TeamMember"> | string | null
    firmIds?: StringNullableListFilter<"TeamMember">
    heroMediaUrl?: StringNullableFilter<"TeamMember"> | string | null
    linkedInUrl?: StringNullableFilter<"TeamMember"> | string | null
    phoneNumber?: StringNullableFilter<"TeamMember"> | string | null
    sortOrder?: IntFilter<"TeamMember"> | number
    userId?: StringNullableFilter<"TeamMember"> | string | null
    department?: StringNullableFilter<"TeamMember"> | string | null
    managerId?: StringNullableFilter<"TeamMember"> | string | null
  }

  export type UserUpsertWithWhereUniqueWithoutFirmInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutFirmInput, UserUncheckedUpdateWithoutFirmInput>
    create: XOR<UserCreateWithoutFirmInput, UserUncheckedCreateWithoutFirmInput>
  }

  export type UserUpdateWithWhereUniqueWithoutFirmInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutFirmInput, UserUncheckedUpdateWithoutFirmInput>
  }

  export type UserUpdateManyWithWhereWithoutFirmInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutFirmInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    firmId?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    name?: StringNullableFilter<"User"> | string | null
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpires?: DateTimeNullableFilter<"User"> | Date | string | null
  }

  export type TaskUpsertWithWhereUniqueWithoutFirmInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutFirmInput, TaskUncheckedUpdateWithoutFirmInput>
    create: XOR<TaskCreateWithoutFirmInput, TaskUncheckedCreateWithoutFirmInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutFirmInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutFirmInput, TaskUncheckedUpdateWithoutFirmInput>
  }

  export type TaskUpdateManyWithWhereWithoutFirmInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutFirmInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    status?: StringFilter<"Task"> | string
    priority?: StringFilter<"Task"> | string
    assigneeId?: StringNullableFilter<"Task"> | string | null
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    firmId?: StringFilter<"Task"> | string
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
  }

  export type FirmCreateWithoutInvitationsInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    primaryColor?: string | null
    physicalAddress?: string | null
    linkedInUrl?: string | null
    googleReviewsUrl?: string | null
    bio?: string | null
    heroMediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accentColor?: string | null
    backgroundColor?: string | null
    fontColor?: string | null
    showAgencyBranding?: boolean
    logoScale?: number
    borderRadius?: string
    bioFontFamily?: string
    bioFontSize?: number
    firmNameFontFamily?: string
    firmNameFontSize?: number
    firmNameFontWeight?: string
    isColorLinked?: boolean
    isFontLinked?: boolean
    bioFontColor?: string
    firmNameFontColor?: string
    memberCardBgColor?: string
    memberPhotoSpacing?: number
    showMemberNarrative?: boolean
    isMemberCardColorLinked?: boolean
    cardShadowIntensity?: number
    portfolioListStyle?: string
    showSearchBar?: boolean
    teamListStyle?: string
    viewLayoutMode?: string
    tombstoneInfoBgColor?: string | null
    tombstoneLayout?: FirmCreatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: number
    tombstoneMediaBgColor?: string | null
    tombstoneMetricsBgColor?: string | null
    tombstoneNarrativeBgColor?: string | null
    tombstonePadding?: number
    activityLogs?: ActivityLogCreateNestedManyWithoutFirmInput
    deals?: DealCreateNestedManyWithoutFirmInput
    teamMembers?: TeamMemberCreateNestedManyWithoutFirmInput
    users?: UserCreateNestedManyWithoutFirmInput
    tasks?: TaskCreateNestedManyWithoutFirmInput
  }

  export type FirmUncheckedCreateWithoutInvitationsInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    primaryColor?: string | null
    physicalAddress?: string | null
    linkedInUrl?: string | null
    googleReviewsUrl?: string | null
    bio?: string | null
    heroMediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accentColor?: string | null
    backgroundColor?: string | null
    fontColor?: string | null
    showAgencyBranding?: boolean
    logoScale?: number
    borderRadius?: string
    bioFontFamily?: string
    bioFontSize?: number
    firmNameFontFamily?: string
    firmNameFontSize?: number
    firmNameFontWeight?: string
    isColorLinked?: boolean
    isFontLinked?: boolean
    bioFontColor?: string
    firmNameFontColor?: string
    memberCardBgColor?: string
    memberPhotoSpacing?: number
    showMemberNarrative?: boolean
    isMemberCardColorLinked?: boolean
    cardShadowIntensity?: number
    portfolioListStyle?: string
    showSearchBar?: boolean
    teamListStyle?: string
    viewLayoutMode?: string
    tombstoneInfoBgColor?: string | null
    tombstoneLayout?: FirmCreatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: number
    tombstoneMediaBgColor?: string | null
    tombstoneMetricsBgColor?: string | null
    tombstoneNarrativeBgColor?: string | null
    tombstonePadding?: number
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutFirmInput
    deals?: DealUncheckedCreateNestedManyWithoutFirmInput
    teamMembers?: TeamMemberUncheckedCreateNestedManyWithoutFirmInput
    users?: UserUncheckedCreateNestedManyWithoutFirmInput
    tasks?: TaskUncheckedCreateNestedManyWithoutFirmInput
  }

  export type FirmCreateOrConnectWithoutInvitationsInput = {
    where: FirmWhereUniqueInput
    create: XOR<FirmCreateWithoutInvitationsInput, FirmUncheckedCreateWithoutInvitationsInput>
  }

  export type FirmUpsertWithoutInvitationsInput = {
    update: XOR<FirmUpdateWithoutInvitationsInput, FirmUncheckedUpdateWithoutInvitationsInput>
    create: XOR<FirmCreateWithoutInvitationsInput, FirmUncheckedCreateWithoutInvitationsInput>
    where?: FirmWhereInput
  }

  export type FirmUpdateToOneWithWhereWithoutInvitationsInput = {
    where?: FirmWhereInput
    data: XOR<FirmUpdateWithoutInvitationsInput, FirmUncheckedUpdateWithoutInvitationsInput>
  }

  export type FirmUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleReviewsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accentColor?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundColor?: NullableStringFieldUpdateOperationsInput | string | null
    fontColor?: NullableStringFieldUpdateOperationsInput | string | null
    showAgencyBranding?: BoolFieldUpdateOperationsInput | boolean
    logoScale?: FloatFieldUpdateOperationsInput | number
    borderRadius?: StringFieldUpdateOperationsInput | string
    bioFontFamily?: StringFieldUpdateOperationsInput | string
    bioFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontFamily?: StringFieldUpdateOperationsInput | string
    firmNameFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontWeight?: StringFieldUpdateOperationsInput | string
    isColorLinked?: BoolFieldUpdateOperationsInput | boolean
    isFontLinked?: BoolFieldUpdateOperationsInput | boolean
    bioFontColor?: StringFieldUpdateOperationsInput | string
    firmNameFontColor?: StringFieldUpdateOperationsInput | string
    memberCardBgColor?: StringFieldUpdateOperationsInput | string
    memberPhotoSpacing?: IntFieldUpdateOperationsInput | number
    showMemberNarrative?: BoolFieldUpdateOperationsInput | boolean
    isMemberCardColorLinked?: BoolFieldUpdateOperationsInput | boolean
    cardShadowIntensity?: FloatFieldUpdateOperationsInput | number
    portfolioListStyle?: StringFieldUpdateOperationsInput | string
    showSearchBar?: BoolFieldUpdateOperationsInput | boolean
    teamListStyle?: StringFieldUpdateOperationsInput | string
    viewLayoutMode?: StringFieldUpdateOperationsInput | string
    tombstoneInfoBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneLayout?: FirmUpdatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: IntFieldUpdateOperationsInput | number
    tombstoneMediaBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneMetricsBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneNarrativeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstonePadding?: IntFieldUpdateOperationsInput | number
    activityLogs?: ActivityLogUpdateManyWithoutFirmNestedInput
    deals?: DealUpdateManyWithoutFirmNestedInput
    teamMembers?: TeamMemberUpdateManyWithoutFirmNestedInput
    users?: UserUpdateManyWithoutFirmNestedInput
    tasks?: TaskUpdateManyWithoutFirmNestedInput
  }

  export type FirmUncheckedUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleReviewsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accentColor?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundColor?: NullableStringFieldUpdateOperationsInput | string | null
    fontColor?: NullableStringFieldUpdateOperationsInput | string | null
    showAgencyBranding?: BoolFieldUpdateOperationsInput | boolean
    logoScale?: FloatFieldUpdateOperationsInput | number
    borderRadius?: StringFieldUpdateOperationsInput | string
    bioFontFamily?: StringFieldUpdateOperationsInput | string
    bioFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontFamily?: StringFieldUpdateOperationsInput | string
    firmNameFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontWeight?: StringFieldUpdateOperationsInput | string
    isColorLinked?: BoolFieldUpdateOperationsInput | boolean
    isFontLinked?: BoolFieldUpdateOperationsInput | boolean
    bioFontColor?: StringFieldUpdateOperationsInput | string
    firmNameFontColor?: StringFieldUpdateOperationsInput | string
    memberCardBgColor?: StringFieldUpdateOperationsInput | string
    memberPhotoSpacing?: IntFieldUpdateOperationsInput | number
    showMemberNarrative?: BoolFieldUpdateOperationsInput | boolean
    isMemberCardColorLinked?: BoolFieldUpdateOperationsInput | boolean
    cardShadowIntensity?: FloatFieldUpdateOperationsInput | number
    portfolioListStyle?: StringFieldUpdateOperationsInput | string
    showSearchBar?: BoolFieldUpdateOperationsInput | boolean
    teamListStyle?: StringFieldUpdateOperationsInput | string
    viewLayoutMode?: StringFieldUpdateOperationsInput | string
    tombstoneInfoBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneLayout?: FirmUpdatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: IntFieldUpdateOperationsInput | number
    tombstoneMediaBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneMetricsBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneNarrativeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstonePadding?: IntFieldUpdateOperationsInput | number
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutFirmNestedInput
    deals?: DealUncheckedUpdateManyWithoutFirmNestedInput
    teamMembers?: TeamMemberUncheckedUpdateManyWithoutFirmNestedInput
    users?: UserUncheckedUpdateManyWithoutFirmNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutFirmNestedInput
  }

  export type TeamMemberCreateWithoutUserInput = {
    id?: string
    name: string
    slug: string
    role: string
    email?: string | null
    imageURL?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bio?: string | null
    firmIds?: TeamMemberCreatefirmIdsInput | string[]
    heroMediaUrl?: string | null
    linkedInUrl?: string | null
    phoneNumber?: string | null
    sortOrder?: number
    department?: string | null
    manager?: TeamMemberCreateNestedOneWithoutReportsInput
    reports?: TeamMemberCreateNestedManyWithoutManagerInput
    deals?: DealCreateNestedManyWithoutTeamMemberInput
    tasks?: TaskCreateNestedManyWithoutAssigneeInput
    firm: FirmCreateNestedOneWithoutTeamMembersInput
    files?: AssetFileCreateNestedManyWithoutTeamMemberInput
  }

  export type TeamMemberUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    slug: string
    role: string
    email?: string | null
    imageURL?: string | null
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    bio?: string | null
    firmIds?: TeamMemberCreatefirmIdsInput | string[]
    heroMediaUrl?: string | null
    linkedInUrl?: string | null
    phoneNumber?: string | null
    sortOrder?: number
    department?: string | null
    managerId?: string | null
    reports?: TeamMemberUncheckedCreateNestedManyWithoutManagerInput
    deals?: DealUncheckedCreateNestedManyWithoutTeamMemberInput
    tasks?: TaskUncheckedCreateNestedManyWithoutAssigneeInput
    files?: AssetFileUncheckedCreateNestedManyWithoutTeamMemberInput
  }

  export type TeamMemberCreateOrConnectWithoutUserInput = {
    where: TeamMemberWhereUniqueInput
    create: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput>
  }

  export type FirmCreateWithoutUsersInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    primaryColor?: string | null
    physicalAddress?: string | null
    linkedInUrl?: string | null
    googleReviewsUrl?: string | null
    bio?: string | null
    heroMediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accentColor?: string | null
    backgroundColor?: string | null
    fontColor?: string | null
    showAgencyBranding?: boolean
    logoScale?: number
    borderRadius?: string
    bioFontFamily?: string
    bioFontSize?: number
    firmNameFontFamily?: string
    firmNameFontSize?: number
    firmNameFontWeight?: string
    isColorLinked?: boolean
    isFontLinked?: boolean
    bioFontColor?: string
    firmNameFontColor?: string
    memberCardBgColor?: string
    memberPhotoSpacing?: number
    showMemberNarrative?: boolean
    isMemberCardColorLinked?: boolean
    cardShadowIntensity?: number
    portfolioListStyle?: string
    showSearchBar?: boolean
    teamListStyle?: string
    viewLayoutMode?: string
    tombstoneInfoBgColor?: string | null
    tombstoneLayout?: FirmCreatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: number
    tombstoneMediaBgColor?: string | null
    tombstoneMetricsBgColor?: string | null
    tombstoneNarrativeBgColor?: string | null
    tombstonePadding?: number
    activityLogs?: ActivityLogCreateNestedManyWithoutFirmInput
    deals?: DealCreateNestedManyWithoutFirmInput
    invitations?: InvitationCreateNestedManyWithoutFirmInput
    teamMembers?: TeamMemberCreateNestedManyWithoutFirmInput
    tasks?: TaskCreateNestedManyWithoutFirmInput
  }

  export type FirmUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    primaryColor?: string | null
    physicalAddress?: string | null
    linkedInUrl?: string | null
    googleReviewsUrl?: string | null
    bio?: string | null
    heroMediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accentColor?: string | null
    backgroundColor?: string | null
    fontColor?: string | null
    showAgencyBranding?: boolean
    logoScale?: number
    borderRadius?: string
    bioFontFamily?: string
    bioFontSize?: number
    firmNameFontFamily?: string
    firmNameFontSize?: number
    firmNameFontWeight?: string
    isColorLinked?: boolean
    isFontLinked?: boolean
    bioFontColor?: string
    firmNameFontColor?: string
    memberCardBgColor?: string
    memberPhotoSpacing?: number
    showMemberNarrative?: boolean
    isMemberCardColorLinked?: boolean
    cardShadowIntensity?: number
    portfolioListStyle?: string
    showSearchBar?: boolean
    teamListStyle?: string
    viewLayoutMode?: string
    tombstoneInfoBgColor?: string | null
    tombstoneLayout?: FirmCreatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: number
    tombstoneMediaBgColor?: string | null
    tombstoneMetricsBgColor?: string | null
    tombstoneNarrativeBgColor?: string | null
    tombstonePadding?: number
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutFirmInput
    deals?: DealUncheckedCreateNestedManyWithoutFirmInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutFirmInput
    teamMembers?: TeamMemberUncheckedCreateNestedManyWithoutFirmInput
    tasks?: TaskUncheckedCreateNestedManyWithoutFirmInput
  }

  export type FirmCreateOrConnectWithoutUsersInput = {
    where: FirmWhereUniqueInput
    create: XOR<FirmCreateWithoutUsersInput, FirmUncheckedCreateWithoutUsersInput>
  }

  export type TeamMemberUpsertWithoutUserInput = {
    update: XOR<TeamMemberUpdateWithoutUserInput, TeamMemberUncheckedUpdateWithoutUserInput>
    create: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput>
    where?: TeamMemberWhereInput
  }

  export type TeamMemberUpdateToOneWithWhereWithoutUserInput = {
    where?: TeamMemberWhereInput
    data: XOR<TeamMemberUpdateWithoutUserInput, TeamMemberUncheckedUpdateWithoutUserInput>
  }

  export type TeamMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    department?: NullableStringFieldUpdateOperationsInput | string | null
    manager?: TeamMemberUpdateOneWithoutReportsNestedInput
    reports?: TeamMemberUpdateManyWithoutManagerNestedInput
    deals?: DealUpdateManyWithoutTeamMemberNestedInput
    tasks?: TaskUpdateManyWithoutAssigneeNestedInput
    firm?: FirmUpdateOneRequiredWithoutTeamMembersNestedInput
    files?: AssetFileUpdateManyWithoutTeamMemberNestedInput
  }

  export type TeamMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    department?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    reports?: TeamMemberUncheckedUpdateManyWithoutManagerNestedInput
    deals?: DealUncheckedUpdateManyWithoutTeamMemberNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutAssigneeNestedInput
    files?: AssetFileUncheckedUpdateManyWithoutTeamMemberNestedInput
  }

  export type FirmUpsertWithoutUsersInput = {
    update: XOR<FirmUpdateWithoutUsersInput, FirmUncheckedUpdateWithoutUsersInput>
    create: XOR<FirmCreateWithoutUsersInput, FirmUncheckedCreateWithoutUsersInput>
    where?: FirmWhereInput
  }

  export type FirmUpdateToOneWithWhereWithoutUsersInput = {
    where?: FirmWhereInput
    data: XOR<FirmUpdateWithoutUsersInput, FirmUncheckedUpdateWithoutUsersInput>
  }

  export type FirmUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleReviewsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accentColor?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundColor?: NullableStringFieldUpdateOperationsInput | string | null
    fontColor?: NullableStringFieldUpdateOperationsInput | string | null
    showAgencyBranding?: BoolFieldUpdateOperationsInput | boolean
    logoScale?: FloatFieldUpdateOperationsInput | number
    borderRadius?: StringFieldUpdateOperationsInput | string
    bioFontFamily?: StringFieldUpdateOperationsInput | string
    bioFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontFamily?: StringFieldUpdateOperationsInput | string
    firmNameFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontWeight?: StringFieldUpdateOperationsInput | string
    isColorLinked?: BoolFieldUpdateOperationsInput | boolean
    isFontLinked?: BoolFieldUpdateOperationsInput | boolean
    bioFontColor?: StringFieldUpdateOperationsInput | string
    firmNameFontColor?: StringFieldUpdateOperationsInput | string
    memberCardBgColor?: StringFieldUpdateOperationsInput | string
    memberPhotoSpacing?: IntFieldUpdateOperationsInput | number
    showMemberNarrative?: BoolFieldUpdateOperationsInput | boolean
    isMemberCardColorLinked?: BoolFieldUpdateOperationsInput | boolean
    cardShadowIntensity?: FloatFieldUpdateOperationsInput | number
    portfolioListStyle?: StringFieldUpdateOperationsInput | string
    showSearchBar?: BoolFieldUpdateOperationsInput | boolean
    teamListStyle?: StringFieldUpdateOperationsInput | string
    viewLayoutMode?: StringFieldUpdateOperationsInput | string
    tombstoneInfoBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneLayout?: FirmUpdatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: IntFieldUpdateOperationsInput | number
    tombstoneMediaBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneMetricsBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneNarrativeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstonePadding?: IntFieldUpdateOperationsInput | number
    activityLogs?: ActivityLogUpdateManyWithoutFirmNestedInput
    deals?: DealUpdateManyWithoutFirmNestedInput
    invitations?: InvitationUpdateManyWithoutFirmNestedInput
    teamMembers?: TeamMemberUpdateManyWithoutFirmNestedInput
    tasks?: TaskUpdateManyWithoutFirmNestedInput
  }

  export type FirmUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleReviewsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accentColor?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundColor?: NullableStringFieldUpdateOperationsInput | string | null
    fontColor?: NullableStringFieldUpdateOperationsInput | string | null
    showAgencyBranding?: BoolFieldUpdateOperationsInput | boolean
    logoScale?: FloatFieldUpdateOperationsInput | number
    borderRadius?: StringFieldUpdateOperationsInput | string
    bioFontFamily?: StringFieldUpdateOperationsInput | string
    bioFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontFamily?: StringFieldUpdateOperationsInput | string
    firmNameFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontWeight?: StringFieldUpdateOperationsInput | string
    isColorLinked?: BoolFieldUpdateOperationsInput | boolean
    isFontLinked?: BoolFieldUpdateOperationsInput | boolean
    bioFontColor?: StringFieldUpdateOperationsInput | string
    firmNameFontColor?: StringFieldUpdateOperationsInput | string
    memberCardBgColor?: StringFieldUpdateOperationsInput | string
    memberPhotoSpacing?: IntFieldUpdateOperationsInput | number
    showMemberNarrative?: BoolFieldUpdateOperationsInput | boolean
    isMemberCardColorLinked?: BoolFieldUpdateOperationsInput | boolean
    cardShadowIntensity?: FloatFieldUpdateOperationsInput | number
    portfolioListStyle?: StringFieldUpdateOperationsInput | string
    showSearchBar?: BoolFieldUpdateOperationsInput | boolean
    teamListStyle?: StringFieldUpdateOperationsInput | string
    viewLayoutMode?: StringFieldUpdateOperationsInput | string
    tombstoneInfoBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneLayout?: FirmUpdatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: IntFieldUpdateOperationsInput | number
    tombstoneMediaBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneMetricsBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneNarrativeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstonePadding?: IntFieldUpdateOperationsInput | number
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutFirmNestedInput
    deals?: DealUncheckedUpdateManyWithoutFirmNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutFirmNestedInput
    teamMembers?: TeamMemberUncheckedUpdateManyWithoutFirmNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutFirmNestedInput
  }

  export type TeamMemberCreateWithoutReportsInput = {
    id?: string
    name: string
    slug: string
    role: string
    email?: string | null
    imageURL?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bio?: string | null
    firmIds?: TeamMemberCreatefirmIdsInput | string[]
    heroMediaUrl?: string | null
    linkedInUrl?: string | null
    phoneNumber?: string | null
    sortOrder?: number
    department?: string | null
    manager?: TeamMemberCreateNestedOneWithoutReportsInput
    deals?: DealCreateNestedManyWithoutTeamMemberInput
    tasks?: TaskCreateNestedManyWithoutAssigneeInput
    firm: FirmCreateNestedOneWithoutTeamMembersInput
    user?: UserCreateNestedOneWithoutProfessionalProfileInput
    files?: AssetFileCreateNestedManyWithoutTeamMemberInput
  }

  export type TeamMemberUncheckedCreateWithoutReportsInput = {
    id?: string
    name: string
    slug: string
    role: string
    email?: string | null
    imageURL?: string | null
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    bio?: string | null
    firmIds?: TeamMemberCreatefirmIdsInput | string[]
    heroMediaUrl?: string | null
    linkedInUrl?: string | null
    phoneNumber?: string | null
    sortOrder?: number
    userId?: string | null
    department?: string | null
    managerId?: string | null
    deals?: DealUncheckedCreateNestedManyWithoutTeamMemberInput
    tasks?: TaskUncheckedCreateNestedManyWithoutAssigneeInput
    files?: AssetFileUncheckedCreateNestedManyWithoutTeamMemberInput
  }

  export type TeamMemberCreateOrConnectWithoutReportsInput = {
    where: TeamMemberWhereUniqueInput
    create: XOR<TeamMemberCreateWithoutReportsInput, TeamMemberUncheckedCreateWithoutReportsInput>
  }

  export type TeamMemberCreateWithoutManagerInput = {
    id?: string
    name: string
    slug: string
    role: string
    email?: string | null
    imageURL?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bio?: string | null
    firmIds?: TeamMemberCreatefirmIdsInput | string[]
    heroMediaUrl?: string | null
    linkedInUrl?: string | null
    phoneNumber?: string | null
    sortOrder?: number
    department?: string | null
    reports?: TeamMemberCreateNestedManyWithoutManagerInput
    deals?: DealCreateNestedManyWithoutTeamMemberInput
    tasks?: TaskCreateNestedManyWithoutAssigneeInput
    firm: FirmCreateNestedOneWithoutTeamMembersInput
    user?: UserCreateNestedOneWithoutProfessionalProfileInput
    files?: AssetFileCreateNestedManyWithoutTeamMemberInput
  }

  export type TeamMemberUncheckedCreateWithoutManagerInput = {
    id?: string
    name: string
    slug: string
    role: string
    email?: string | null
    imageURL?: string | null
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    bio?: string | null
    firmIds?: TeamMemberCreatefirmIdsInput | string[]
    heroMediaUrl?: string | null
    linkedInUrl?: string | null
    phoneNumber?: string | null
    sortOrder?: number
    userId?: string | null
    department?: string | null
    reports?: TeamMemberUncheckedCreateNestedManyWithoutManagerInput
    deals?: DealUncheckedCreateNestedManyWithoutTeamMemberInput
    tasks?: TaskUncheckedCreateNestedManyWithoutAssigneeInput
    files?: AssetFileUncheckedCreateNestedManyWithoutTeamMemberInput
  }

  export type TeamMemberCreateOrConnectWithoutManagerInput = {
    where: TeamMemberWhereUniqueInput
    create: XOR<TeamMemberCreateWithoutManagerInput, TeamMemberUncheckedCreateWithoutManagerInput>
  }

  export type TeamMemberCreateManyManagerInputEnvelope = {
    data: TeamMemberCreateManyManagerInput | TeamMemberCreateManyManagerInput[]
    skipDuplicates?: boolean
  }

  export type DealCreateWithoutTeamMemberInput = {
    id?: string
    address: string
    assetType: $Enums.AssetType
    strategy: $Enums.Strategy
    purchaseAmount?: number | null
    financedAmount?: number | null
    stillImageURL?: string | null
    generatedVideoURL?: string | null
    isPublic?: boolean
    capRate?: number | null
    sqFt?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    arv?: number | null
    context?: string | null
    financingType?: string | null
    images?: DealCreateimagesInput | string[]
    investmentOverview?: string | null
    rehabAmount?: number | null
    teamMemberIds?: DealCreateteamMemberIdsInput | string[]
    sortOrder?: number
    firm: FirmCreateNestedOneWithoutDealsInput
  }

  export type DealUncheckedCreateWithoutTeamMemberInput = {
    id?: string
    address: string
    assetType: $Enums.AssetType
    strategy: $Enums.Strategy
    purchaseAmount?: number | null
    financedAmount?: number | null
    stillImageURL?: string | null
    generatedVideoURL?: string | null
    isPublic?: boolean
    capRate?: number | null
    sqFt?: number | null
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    arv?: number | null
    context?: string | null
    financingType?: string | null
    images?: DealCreateimagesInput | string[]
    investmentOverview?: string | null
    rehabAmount?: number | null
    teamMemberIds?: DealCreateteamMemberIdsInput | string[]
    sortOrder?: number
  }

  export type DealCreateOrConnectWithoutTeamMemberInput = {
    where: DealWhereUniqueInput
    create: XOR<DealCreateWithoutTeamMemberInput, DealUncheckedCreateWithoutTeamMemberInput>
  }

  export type DealCreateManyTeamMemberInputEnvelope = {
    data: DealCreateManyTeamMemberInput | DealCreateManyTeamMemberInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutAssigneeInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    priority?: string
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    firm: FirmCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutAssigneeInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    priority?: string
    dueDate?: Date | string | null
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateOrConnectWithoutAssigneeInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutAssigneeInput, TaskUncheckedCreateWithoutAssigneeInput>
  }

  export type TaskCreateManyAssigneeInputEnvelope = {
    data: TaskCreateManyAssigneeInput | TaskCreateManyAssigneeInput[]
    skipDuplicates?: boolean
  }

  export type FirmCreateWithoutTeamMembersInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    primaryColor?: string | null
    physicalAddress?: string | null
    linkedInUrl?: string | null
    googleReviewsUrl?: string | null
    bio?: string | null
    heroMediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accentColor?: string | null
    backgroundColor?: string | null
    fontColor?: string | null
    showAgencyBranding?: boolean
    logoScale?: number
    borderRadius?: string
    bioFontFamily?: string
    bioFontSize?: number
    firmNameFontFamily?: string
    firmNameFontSize?: number
    firmNameFontWeight?: string
    isColorLinked?: boolean
    isFontLinked?: boolean
    bioFontColor?: string
    firmNameFontColor?: string
    memberCardBgColor?: string
    memberPhotoSpacing?: number
    showMemberNarrative?: boolean
    isMemberCardColorLinked?: boolean
    cardShadowIntensity?: number
    portfolioListStyle?: string
    showSearchBar?: boolean
    teamListStyle?: string
    viewLayoutMode?: string
    tombstoneInfoBgColor?: string | null
    tombstoneLayout?: FirmCreatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: number
    tombstoneMediaBgColor?: string | null
    tombstoneMetricsBgColor?: string | null
    tombstoneNarrativeBgColor?: string | null
    tombstonePadding?: number
    activityLogs?: ActivityLogCreateNestedManyWithoutFirmInput
    deals?: DealCreateNestedManyWithoutFirmInput
    invitations?: InvitationCreateNestedManyWithoutFirmInput
    users?: UserCreateNestedManyWithoutFirmInput
    tasks?: TaskCreateNestedManyWithoutFirmInput
  }

  export type FirmUncheckedCreateWithoutTeamMembersInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    primaryColor?: string | null
    physicalAddress?: string | null
    linkedInUrl?: string | null
    googleReviewsUrl?: string | null
    bio?: string | null
    heroMediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accentColor?: string | null
    backgroundColor?: string | null
    fontColor?: string | null
    showAgencyBranding?: boolean
    logoScale?: number
    borderRadius?: string
    bioFontFamily?: string
    bioFontSize?: number
    firmNameFontFamily?: string
    firmNameFontSize?: number
    firmNameFontWeight?: string
    isColorLinked?: boolean
    isFontLinked?: boolean
    bioFontColor?: string
    firmNameFontColor?: string
    memberCardBgColor?: string
    memberPhotoSpacing?: number
    showMemberNarrative?: boolean
    isMemberCardColorLinked?: boolean
    cardShadowIntensity?: number
    portfolioListStyle?: string
    showSearchBar?: boolean
    teamListStyle?: string
    viewLayoutMode?: string
    tombstoneInfoBgColor?: string | null
    tombstoneLayout?: FirmCreatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: number
    tombstoneMediaBgColor?: string | null
    tombstoneMetricsBgColor?: string | null
    tombstoneNarrativeBgColor?: string | null
    tombstonePadding?: number
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutFirmInput
    deals?: DealUncheckedCreateNestedManyWithoutFirmInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutFirmInput
    users?: UserUncheckedCreateNestedManyWithoutFirmInput
    tasks?: TaskUncheckedCreateNestedManyWithoutFirmInput
  }

  export type FirmCreateOrConnectWithoutTeamMembersInput = {
    where: FirmWhereUniqueInput
    create: XOR<FirmCreateWithoutTeamMembersInput, FirmUncheckedCreateWithoutTeamMembersInput>
  }

  export type UserCreateWithoutProfessionalProfileInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    name?: string | null
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
    firm: FirmCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutProfessionalProfileInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name?: string | null
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
  }

  export type UserCreateOrConnectWithoutProfessionalProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfessionalProfileInput, UserUncheckedCreateWithoutProfessionalProfileInput>
  }

  export type AssetFileCreateWithoutTeamMemberInput = {
    id?: string
    name: string
    content: string
    type?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssetFileUncheckedCreateWithoutTeamMemberInput = {
    id?: string
    name: string
    content: string
    type?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssetFileCreateOrConnectWithoutTeamMemberInput = {
    where: AssetFileWhereUniqueInput
    create: XOR<AssetFileCreateWithoutTeamMemberInput, AssetFileUncheckedCreateWithoutTeamMemberInput>
  }

  export type AssetFileCreateManyTeamMemberInputEnvelope = {
    data: AssetFileCreateManyTeamMemberInput | AssetFileCreateManyTeamMemberInput[]
    skipDuplicates?: boolean
  }

  export type TeamMemberUpsertWithoutReportsInput = {
    update: XOR<TeamMemberUpdateWithoutReportsInput, TeamMemberUncheckedUpdateWithoutReportsInput>
    create: XOR<TeamMemberCreateWithoutReportsInput, TeamMemberUncheckedCreateWithoutReportsInput>
    where?: TeamMemberWhereInput
  }

  export type TeamMemberUpdateToOneWithWhereWithoutReportsInput = {
    where?: TeamMemberWhereInput
    data: XOR<TeamMemberUpdateWithoutReportsInput, TeamMemberUncheckedUpdateWithoutReportsInput>
  }

  export type TeamMemberUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    department?: NullableStringFieldUpdateOperationsInput | string | null
    manager?: TeamMemberUpdateOneWithoutReportsNestedInput
    deals?: DealUpdateManyWithoutTeamMemberNestedInput
    tasks?: TaskUpdateManyWithoutAssigneeNestedInput
    firm?: FirmUpdateOneRequiredWithoutTeamMembersNestedInput
    user?: UserUpdateOneWithoutProfessionalProfileNestedInput
    files?: AssetFileUpdateManyWithoutTeamMemberNestedInput
  }

  export type TeamMemberUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    deals?: DealUncheckedUpdateManyWithoutTeamMemberNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutAssigneeNestedInput
    files?: AssetFileUncheckedUpdateManyWithoutTeamMemberNestedInput
  }

  export type TeamMemberUpsertWithWhereUniqueWithoutManagerInput = {
    where: TeamMemberWhereUniqueInput
    update: XOR<TeamMemberUpdateWithoutManagerInput, TeamMemberUncheckedUpdateWithoutManagerInput>
    create: XOR<TeamMemberCreateWithoutManagerInput, TeamMemberUncheckedCreateWithoutManagerInput>
  }

  export type TeamMemberUpdateWithWhereUniqueWithoutManagerInput = {
    where: TeamMemberWhereUniqueInput
    data: XOR<TeamMemberUpdateWithoutManagerInput, TeamMemberUncheckedUpdateWithoutManagerInput>
  }

  export type TeamMemberUpdateManyWithWhereWithoutManagerInput = {
    where: TeamMemberScalarWhereInput
    data: XOR<TeamMemberUpdateManyMutationInput, TeamMemberUncheckedUpdateManyWithoutManagerInput>
  }

  export type DealUpsertWithWhereUniqueWithoutTeamMemberInput = {
    where: DealWhereUniqueInput
    update: XOR<DealUpdateWithoutTeamMemberInput, DealUncheckedUpdateWithoutTeamMemberInput>
    create: XOR<DealCreateWithoutTeamMemberInput, DealUncheckedCreateWithoutTeamMemberInput>
  }

  export type DealUpdateWithWhereUniqueWithoutTeamMemberInput = {
    where: DealWhereUniqueInput
    data: XOR<DealUpdateWithoutTeamMemberInput, DealUncheckedUpdateWithoutTeamMemberInput>
  }

  export type DealUpdateManyWithWhereWithoutTeamMemberInput = {
    where: DealScalarWhereInput
    data: XOR<DealUpdateManyMutationInput, DealUncheckedUpdateManyWithoutTeamMemberInput>
  }

  export type TaskUpsertWithWhereUniqueWithoutAssigneeInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutAssigneeInput, TaskUncheckedUpdateWithoutAssigneeInput>
    create: XOR<TaskCreateWithoutAssigneeInput, TaskUncheckedCreateWithoutAssigneeInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutAssigneeInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutAssigneeInput, TaskUncheckedUpdateWithoutAssigneeInput>
  }

  export type TaskUpdateManyWithWhereWithoutAssigneeInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutAssigneeInput>
  }

  export type FirmUpsertWithoutTeamMembersInput = {
    update: XOR<FirmUpdateWithoutTeamMembersInput, FirmUncheckedUpdateWithoutTeamMembersInput>
    create: XOR<FirmCreateWithoutTeamMembersInput, FirmUncheckedCreateWithoutTeamMembersInput>
    where?: FirmWhereInput
  }

  export type FirmUpdateToOneWithWhereWithoutTeamMembersInput = {
    where?: FirmWhereInput
    data: XOR<FirmUpdateWithoutTeamMembersInput, FirmUncheckedUpdateWithoutTeamMembersInput>
  }

  export type FirmUpdateWithoutTeamMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleReviewsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accentColor?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundColor?: NullableStringFieldUpdateOperationsInput | string | null
    fontColor?: NullableStringFieldUpdateOperationsInput | string | null
    showAgencyBranding?: BoolFieldUpdateOperationsInput | boolean
    logoScale?: FloatFieldUpdateOperationsInput | number
    borderRadius?: StringFieldUpdateOperationsInput | string
    bioFontFamily?: StringFieldUpdateOperationsInput | string
    bioFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontFamily?: StringFieldUpdateOperationsInput | string
    firmNameFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontWeight?: StringFieldUpdateOperationsInput | string
    isColorLinked?: BoolFieldUpdateOperationsInput | boolean
    isFontLinked?: BoolFieldUpdateOperationsInput | boolean
    bioFontColor?: StringFieldUpdateOperationsInput | string
    firmNameFontColor?: StringFieldUpdateOperationsInput | string
    memberCardBgColor?: StringFieldUpdateOperationsInput | string
    memberPhotoSpacing?: IntFieldUpdateOperationsInput | number
    showMemberNarrative?: BoolFieldUpdateOperationsInput | boolean
    isMemberCardColorLinked?: BoolFieldUpdateOperationsInput | boolean
    cardShadowIntensity?: FloatFieldUpdateOperationsInput | number
    portfolioListStyle?: StringFieldUpdateOperationsInput | string
    showSearchBar?: BoolFieldUpdateOperationsInput | boolean
    teamListStyle?: StringFieldUpdateOperationsInput | string
    viewLayoutMode?: StringFieldUpdateOperationsInput | string
    tombstoneInfoBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneLayout?: FirmUpdatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: IntFieldUpdateOperationsInput | number
    tombstoneMediaBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneMetricsBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneNarrativeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstonePadding?: IntFieldUpdateOperationsInput | number
    activityLogs?: ActivityLogUpdateManyWithoutFirmNestedInput
    deals?: DealUpdateManyWithoutFirmNestedInput
    invitations?: InvitationUpdateManyWithoutFirmNestedInput
    users?: UserUpdateManyWithoutFirmNestedInput
    tasks?: TaskUpdateManyWithoutFirmNestedInput
  }

  export type FirmUncheckedUpdateWithoutTeamMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleReviewsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accentColor?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundColor?: NullableStringFieldUpdateOperationsInput | string | null
    fontColor?: NullableStringFieldUpdateOperationsInput | string | null
    showAgencyBranding?: BoolFieldUpdateOperationsInput | boolean
    logoScale?: FloatFieldUpdateOperationsInput | number
    borderRadius?: StringFieldUpdateOperationsInput | string
    bioFontFamily?: StringFieldUpdateOperationsInput | string
    bioFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontFamily?: StringFieldUpdateOperationsInput | string
    firmNameFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontWeight?: StringFieldUpdateOperationsInput | string
    isColorLinked?: BoolFieldUpdateOperationsInput | boolean
    isFontLinked?: BoolFieldUpdateOperationsInput | boolean
    bioFontColor?: StringFieldUpdateOperationsInput | string
    firmNameFontColor?: StringFieldUpdateOperationsInput | string
    memberCardBgColor?: StringFieldUpdateOperationsInput | string
    memberPhotoSpacing?: IntFieldUpdateOperationsInput | number
    showMemberNarrative?: BoolFieldUpdateOperationsInput | boolean
    isMemberCardColorLinked?: BoolFieldUpdateOperationsInput | boolean
    cardShadowIntensity?: FloatFieldUpdateOperationsInput | number
    portfolioListStyle?: StringFieldUpdateOperationsInput | string
    showSearchBar?: BoolFieldUpdateOperationsInput | boolean
    teamListStyle?: StringFieldUpdateOperationsInput | string
    viewLayoutMode?: StringFieldUpdateOperationsInput | string
    tombstoneInfoBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneLayout?: FirmUpdatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: IntFieldUpdateOperationsInput | number
    tombstoneMediaBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneMetricsBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneNarrativeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstonePadding?: IntFieldUpdateOperationsInput | number
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutFirmNestedInput
    deals?: DealUncheckedUpdateManyWithoutFirmNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutFirmNestedInput
    users?: UserUncheckedUpdateManyWithoutFirmNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutFirmNestedInput
  }

  export type UserUpsertWithoutProfessionalProfileInput = {
    update: XOR<UserUpdateWithoutProfessionalProfileInput, UserUncheckedUpdateWithoutProfessionalProfileInput>
    create: XOR<UserCreateWithoutProfessionalProfileInput, UserUncheckedCreateWithoutProfessionalProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfessionalProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfessionalProfileInput, UserUncheckedUpdateWithoutProfessionalProfileInput>
  }

  export type UserUpdateWithoutProfessionalProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firm?: FirmUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutProfessionalProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AssetFileUpsertWithWhereUniqueWithoutTeamMemberInput = {
    where: AssetFileWhereUniqueInput
    update: XOR<AssetFileUpdateWithoutTeamMemberInput, AssetFileUncheckedUpdateWithoutTeamMemberInput>
    create: XOR<AssetFileCreateWithoutTeamMemberInput, AssetFileUncheckedCreateWithoutTeamMemberInput>
  }

  export type AssetFileUpdateWithWhereUniqueWithoutTeamMemberInput = {
    where: AssetFileWhereUniqueInput
    data: XOR<AssetFileUpdateWithoutTeamMemberInput, AssetFileUncheckedUpdateWithoutTeamMemberInput>
  }

  export type AssetFileUpdateManyWithWhereWithoutTeamMemberInput = {
    where: AssetFileScalarWhereInput
    data: XOR<AssetFileUpdateManyMutationInput, AssetFileUncheckedUpdateManyWithoutTeamMemberInput>
  }

  export type AssetFileScalarWhereInput = {
    AND?: AssetFileScalarWhereInput | AssetFileScalarWhereInput[]
    OR?: AssetFileScalarWhereInput[]
    NOT?: AssetFileScalarWhereInput | AssetFileScalarWhereInput[]
    id?: StringFilter<"AssetFile"> | string
    name?: StringFilter<"AssetFile"> | string
    content?: StringFilter<"AssetFile"> | string
    type?: StringFilter<"AssetFile"> | string
    teamMemberId?: StringFilter<"AssetFile"> | string
    createdAt?: DateTimeFilter<"AssetFile"> | Date | string
    updatedAt?: DateTimeFilter<"AssetFile"> | Date | string
  }

  export type TeamMemberCreateWithoutFilesInput = {
    id?: string
    name: string
    slug: string
    role: string
    email?: string | null
    imageURL?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bio?: string | null
    firmIds?: TeamMemberCreatefirmIdsInput | string[]
    heroMediaUrl?: string | null
    linkedInUrl?: string | null
    phoneNumber?: string | null
    sortOrder?: number
    department?: string | null
    manager?: TeamMemberCreateNestedOneWithoutReportsInput
    reports?: TeamMemberCreateNestedManyWithoutManagerInput
    deals?: DealCreateNestedManyWithoutTeamMemberInput
    tasks?: TaskCreateNestedManyWithoutAssigneeInput
    firm: FirmCreateNestedOneWithoutTeamMembersInput
    user?: UserCreateNestedOneWithoutProfessionalProfileInput
  }

  export type TeamMemberUncheckedCreateWithoutFilesInput = {
    id?: string
    name: string
    slug: string
    role: string
    email?: string | null
    imageURL?: string | null
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    bio?: string | null
    firmIds?: TeamMemberCreatefirmIdsInput | string[]
    heroMediaUrl?: string | null
    linkedInUrl?: string | null
    phoneNumber?: string | null
    sortOrder?: number
    userId?: string | null
    department?: string | null
    managerId?: string | null
    reports?: TeamMemberUncheckedCreateNestedManyWithoutManagerInput
    deals?: DealUncheckedCreateNestedManyWithoutTeamMemberInput
    tasks?: TaskUncheckedCreateNestedManyWithoutAssigneeInput
  }

  export type TeamMemberCreateOrConnectWithoutFilesInput = {
    where: TeamMemberWhereUniqueInput
    create: XOR<TeamMemberCreateWithoutFilesInput, TeamMemberUncheckedCreateWithoutFilesInput>
  }

  export type TeamMemberUpsertWithoutFilesInput = {
    update: XOR<TeamMemberUpdateWithoutFilesInput, TeamMemberUncheckedUpdateWithoutFilesInput>
    create: XOR<TeamMemberCreateWithoutFilesInput, TeamMemberUncheckedCreateWithoutFilesInput>
    where?: TeamMemberWhereInput
  }

  export type TeamMemberUpdateToOneWithWhereWithoutFilesInput = {
    where?: TeamMemberWhereInput
    data: XOR<TeamMemberUpdateWithoutFilesInput, TeamMemberUncheckedUpdateWithoutFilesInput>
  }

  export type TeamMemberUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    department?: NullableStringFieldUpdateOperationsInput | string | null
    manager?: TeamMemberUpdateOneWithoutReportsNestedInput
    reports?: TeamMemberUpdateManyWithoutManagerNestedInput
    deals?: DealUpdateManyWithoutTeamMemberNestedInput
    tasks?: TaskUpdateManyWithoutAssigneeNestedInput
    firm?: FirmUpdateOneRequiredWithoutTeamMembersNestedInput
    user?: UserUpdateOneWithoutProfessionalProfileNestedInput
  }

  export type TeamMemberUncheckedUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    reports?: TeamMemberUncheckedUpdateManyWithoutManagerNestedInput
    deals?: DealUncheckedUpdateManyWithoutTeamMemberNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutAssigneeNestedInput
  }

  export type FirmCreateWithoutDealsInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    primaryColor?: string | null
    physicalAddress?: string | null
    linkedInUrl?: string | null
    googleReviewsUrl?: string | null
    bio?: string | null
    heroMediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accentColor?: string | null
    backgroundColor?: string | null
    fontColor?: string | null
    showAgencyBranding?: boolean
    logoScale?: number
    borderRadius?: string
    bioFontFamily?: string
    bioFontSize?: number
    firmNameFontFamily?: string
    firmNameFontSize?: number
    firmNameFontWeight?: string
    isColorLinked?: boolean
    isFontLinked?: boolean
    bioFontColor?: string
    firmNameFontColor?: string
    memberCardBgColor?: string
    memberPhotoSpacing?: number
    showMemberNarrative?: boolean
    isMemberCardColorLinked?: boolean
    cardShadowIntensity?: number
    portfolioListStyle?: string
    showSearchBar?: boolean
    teamListStyle?: string
    viewLayoutMode?: string
    tombstoneInfoBgColor?: string | null
    tombstoneLayout?: FirmCreatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: number
    tombstoneMediaBgColor?: string | null
    tombstoneMetricsBgColor?: string | null
    tombstoneNarrativeBgColor?: string | null
    tombstonePadding?: number
    activityLogs?: ActivityLogCreateNestedManyWithoutFirmInput
    invitations?: InvitationCreateNestedManyWithoutFirmInput
    teamMembers?: TeamMemberCreateNestedManyWithoutFirmInput
    users?: UserCreateNestedManyWithoutFirmInput
    tasks?: TaskCreateNestedManyWithoutFirmInput
  }

  export type FirmUncheckedCreateWithoutDealsInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    primaryColor?: string | null
    physicalAddress?: string | null
    linkedInUrl?: string | null
    googleReviewsUrl?: string | null
    bio?: string | null
    heroMediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accentColor?: string | null
    backgroundColor?: string | null
    fontColor?: string | null
    showAgencyBranding?: boolean
    logoScale?: number
    borderRadius?: string
    bioFontFamily?: string
    bioFontSize?: number
    firmNameFontFamily?: string
    firmNameFontSize?: number
    firmNameFontWeight?: string
    isColorLinked?: boolean
    isFontLinked?: boolean
    bioFontColor?: string
    firmNameFontColor?: string
    memberCardBgColor?: string
    memberPhotoSpacing?: number
    showMemberNarrative?: boolean
    isMemberCardColorLinked?: boolean
    cardShadowIntensity?: number
    portfolioListStyle?: string
    showSearchBar?: boolean
    teamListStyle?: string
    viewLayoutMode?: string
    tombstoneInfoBgColor?: string | null
    tombstoneLayout?: FirmCreatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: number
    tombstoneMediaBgColor?: string | null
    tombstoneMetricsBgColor?: string | null
    tombstoneNarrativeBgColor?: string | null
    tombstonePadding?: number
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutFirmInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutFirmInput
    teamMembers?: TeamMemberUncheckedCreateNestedManyWithoutFirmInput
    users?: UserUncheckedCreateNestedManyWithoutFirmInput
    tasks?: TaskUncheckedCreateNestedManyWithoutFirmInput
  }

  export type FirmCreateOrConnectWithoutDealsInput = {
    where: FirmWhereUniqueInput
    create: XOR<FirmCreateWithoutDealsInput, FirmUncheckedCreateWithoutDealsInput>
  }

  export type TeamMemberCreateWithoutDealsInput = {
    id?: string
    name: string
    slug: string
    role: string
    email?: string | null
    imageURL?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bio?: string | null
    firmIds?: TeamMemberCreatefirmIdsInput | string[]
    heroMediaUrl?: string | null
    linkedInUrl?: string | null
    phoneNumber?: string | null
    sortOrder?: number
    department?: string | null
    manager?: TeamMemberCreateNestedOneWithoutReportsInput
    reports?: TeamMemberCreateNestedManyWithoutManagerInput
    tasks?: TaskCreateNestedManyWithoutAssigneeInput
    firm: FirmCreateNestedOneWithoutTeamMembersInput
    user?: UserCreateNestedOneWithoutProfessionalProfileInput
    files?: AssetFileCreateNestedManyWithoutTeamMemberInput
  }

  export type TeamMemberUncheckedCreateWithoutDealsInput = {
    id?: string
    name: string
    slug: string
    role: string
    email?: string | null
    imageURL?: string | null
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    bio?: string | null
    firmIds?: TeamMemberCreatefirmIdsInput | string[]
    heroMediaUrl?: string | null
    linkedInUrl?: string | null
    phoneNumber?: string | null
    sortOrder?: number
    userId?: string | null
    department?: string | null
    managerId?: string | null
    reports?: TeamMemberUncheckedCreateNestedManyWithoutManagerInput
    tasks?: TaskUncheckedCreateNestedManyWithoutAssigneeInput
    files?: AssetFileUncheckedCreateNestedManyWithoutTeamMemberInput
  }

  export type TeamMemberCreateOrConnectWithoutDealsInput = {
    where: TeamMemberWhereUniqueInput
    create: XOR<TeamMemberCreateWithoutDealsInput, TeamMemberUncheckedCreateWithoutDealsInput>
  }

  export type FirmUpsertWithoutDealsInput = {
    update: XOR<FirmUpdateWithoutDealsInput, FirmUncheckedUpdateWithoutDealsInput>
    create: XOR<FirmCreateWithoutDealsInput, FirmUncheckedCreateWithoutDealsInput>
    where?: FirmWhereInput
  }

  export type FirmUpdateToOneWithWhereWithoutDealsInput = {
    where?: FirmWhereInput
    data: XOR<FirmUpdateWithoutDealsInput, FirmUncheckedUpdateWithoutDealsInput>
  }

  export type FirmUpdateWithoutDealsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleReviewsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accentColor?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundColor?: NullableStringFieldUpdateOperationsInput | string | null
    fontColor?: NullableStringFieldUpdateOperationsInput | string | null
    showAgencyBranding?: BoolFieldUpdateOperationsInput | boolean
    logoScale?: FloatFieldUpdateOperationsInput | number
    borderRadius?: StringFieldUpdateOperationsInput | string
    bioFontFamily?: StringFieldUpdateOperationsInput | string
    bioFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontFamily?: StringFieldUpdateOperationsInput | string
    firmNameFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontWeight?: StringFieldUpdateOperationsInput | string
    isColorLinked?: BoolFieldUpdateOperationsInput | boolean
    isFontLinked?: BoolFieldUpdateOperationsInput | boolean
    bioFontColor?: StringFieldUpdateOperationsInput | string
    firmNameFontColor?: StringFieldUpdateOperationsInput | string
    memberCardBgColor?: StringFieldUpdateOperationsInput | string
    memberPhotoSpacing?: IntFieldUpdateOperationsInput | number
    showMemberNarrative?: BoolFieldUpdateOperationsInput | boolean
    isMemberCardColorLinked?: BoolFieldUpdateOperationsInput | boolean
    cardShadowIntensity?: FloatFieldUpdateOperationsInput | number
    portfolioListStyle?: StringFieldUpdateOperationsInput | string
    showSearchBar?: BoolFieldUpdateOperationsInput | boolean
    teamListStyle?: StringFieldUpdateOperationsInput | string
    viewLayoutMode?: StringFieldUpdateOperationsInput | string
    tombstoneInfoBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneLayout?: FirmUpdatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: IntFieldUpdateOperationsInput | number
    tombstoneMediaBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneMetricsBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneNarrativeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstonePadding?: IntFieldUpdateOperationsInput | number
    activityLogs?: ActivityLogUpdateManyWithoutFirmNestedInput
    invitations?: InvitationUpdateManyWithoutFirmNestedInput
    teamMembers?: TeamMemberUpdateManyWithoutFirmNestedInput
    users?: UserUpdateManyWithoutFirmNestedInput
    tasks?: TaskUpdateManyWithoutFirmNestedInput
  }

  export type FirmUncheckedUpdateWithoutDealsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleReviewsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accentColor?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundColor?: NullableStringFieldUpdateOperationsInput | string | null
    fontColor?: NullableStringFieldUpdateOperationsInput | string | null
    showAgencyBranding?: BoolFieldUpdateOperationsInput | boolean
    logoScale?: FloatFieldUpdateOperationsInput | number
    borderRadius?: StringFieldUpdateOperationsInput | string
    bioFontFamily?: StringFieldUpdateOperationsInput | string
    bioFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontFamily?: StringFieldUpdateOperationsInput | string
    firmNameFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontWeight?: StringFieldUpdateOperationsInput | string
    isColorLinked?: BoolFieldUpdateOperationsInput | boolean
    isFontLinked?: BoolFieldUpdateOperationsInput | boolean
    bioFontColor?: StringFieldUpdateOperationsInput | string
    firmNameFontColor?: StringFieldUpdateOperationsInput | string
    memberCardBgColor?: StringFieldUpdateOperationsInput | string
    memberPhotoSpacing?: IntFieldUpdateOperationsInput | number
    showMemberNarrative?: BoolFieldUpdateOperationsInput | boolean
    isMemberCardColorLinked?: BoolFieldUpdateOperationsInput | boolean
    cardShadowIntensity?: FloatFieldUpdateOperationsInput | number
    portfolioListStyle?: StringFieldUpdateOperationsInput | string
    showSearchBar?: BoolFieldUpdateOperationsInput | boolean
    teamListStyle?: StringFieldUpdateOperationsInput | string
    viewLayoutMode?: StringFieldUpdateOperationsInput | string
    tombstoneInfoBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneLayout?: FirmUpdatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: IntFieldUpdateOperationsInput | number
    tombstoneMediaBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneMetricsBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneNarrativeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstonePadding?: IntFieldUpdateOperationsInput | number
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutFirmNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutFirmNestedInput
    teamMembers?: TeamMemberUncheckedUpdateManyWithoutFirmNestedInput
    users?: UserUncheckedUpdateManyWithoutFirmNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutFirmNestedInput
  }

  export type TeamMemberUpsertWithoutDealsInput = {
    update: XOR<TeamMemberUpdateWithoutDealsInput, TeamMemberUncheckedUpdateWithoutDealsInput>
    create: XOR<TeamMemberCreateWithoutDealsInput, TeamMemberUncheckedCreateWithoutDealsInput>
    where?: TeamMemberWhereInput
  }

  export type TeamMemberUpdateToOneWithWhereWithoutDealsInput = {
    where?: TeamMemberWhereInput
    data: XOR<TeamMemberUpdateWithoutDealsInput, TeamMemberUncheckedUpdateWithoutDealsInput>
  }

  export type TeamMemberUpdateWithoutDealsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    department?: NullableStringFieldUpdateOperationsInput | string | null
    manager?: TeamMemberUpdateOneWithoutReportsNestedInput
    reports?: TeamMemberUpdateManyWithoutManagerNestedInput
    tasks?: TaskUpdateManyWithoutAssigneeNestedInput
    firm?: FirmUpdateOneRequiredWithoutTeamMembersNestedInput
    user?: UserUpdateOneWithoutProfessionalProfileNestedInput
    files?: AssetFileUpdateManyWithoutTeamMemberNestedInput
  }

  export type TeamMemberUncheckedUpdateWithoutDealsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    reports?: TeamMemberUncheckedUpdateManyWithoutManagerNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutAssigneeNestedInput
    files?: AssetFileUncheckedUpdateManyWithoutTeamMemberNestedInput
  }

  export type FirmCreateWithoutActivityLogsInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    primaryColor?: string | null
    physicalAddress?: string | null
    linkedInUrl?: string | null
    googleReviewsUrl?: string | null
    bio?: string | null
    heroMediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accentColor?: string | null
    backgroundColor?: string | null
    fontColor?: string | null
    showAgencyBranding?: boolean
    logoScale?: number
    borderRadius?: string
    bioFontFamily?: string
    bioFontSize?: number
    firmNameFontFamily?: string
    firmNameFontSize?: number
    firmNameFontWeight?: string
    isColorLinked?: boolean
    isFontLinked?: boolean
    bioFontColor?: string
    firmNameFontColor?: string
    memberCardBgColor?: string
    memberPhotoSpacing?: number
    showMemberNarrative?: boolean
    isMemberCardColorLinked?: boolean
    cardShadowIntensity?: number
    portfolioListStyle?: string
    showSearchBar?: boolean
    teamListStyle?: string
    viewLayoutMode?: string
    tombstoneInfoBgColor?: string | null
    tombstoneLayout?: FirmCreatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: number
    tombstoneMediaBgColor?: string | null
    tombstoneMetricsBgColor?: string | null
    tombstoneNarrativeBgColor?: string | null
    tombstonePadding?: number
    deals?: DealCreateNestedManyWithoutFirmInput
    invitations?: InvitationCreateNestedManyWithoutFirmInput
    teamMembers?: TeamMemberCreateNestedManyWithoutFirmInput
    users?: UserCreateNestedManyWithoutFirmInput
    tasks?: TaskCreateNestedManyWithoutFirmInput
  }

  export type FirmUncheckedCreateWithoutActivityLogsInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    primaryColor?: string | null
    physicalAddress?: string | null
    linkedInUrl?: string | null
    googleReviewsUrl?: string | null
    bio?: string | null
    heroMediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accentColor?: string | null
    backgroundColor?: string | null
    fontColor?: string | null
    showAgencyBranding?: boolean
    logoScale?: number
    borderRadius?: string
    bioFontFamily?: string
    bioFontSize?: number
    firmNameFontFamily?: string
    firmNameFontSize?: number
    firmNameFontWeight?: string
    isColorLinked?: boolean
    isFontLinked?: boolean
    bioFontColor?: string
    firmNameFontColor?: string
    memberCardBgColor?: string
    memberPhotoSpacing?: number
    showMemberNarrative?: boolean
    isMemberCardColorLinked?: boolean
    cardShadowIntensity?: number
    portfolioListStyle?: string
    showSearchBar?: boolean
    teamListStyle?: string
    viewLayoutMode?: string
    tombstoneInfoBgColor?: string | null
    tombstoneLayout?: FirmCreatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: number
    tombstoneMediaBgColor?: string | null
    tombstoneMetricsBgColor?: string | null
    tombstoneNarrativeBgColor?: string | null
    tombstonePadding?: number
    deals?: DealUncheckedCreateNestedManyWithoutFirmInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutFirmInput
    teamMembers?: TeamMemberUncheckedCreateNestedManyWithoutFirmInput
    users?: UserUncheckedCreateNestedManyWithoutFirmInput
    tasks?: TaskUncheckedCreateNestedManyWithoutFirmInput
  }

  export type FirmCreateOrConnectWithoutActivityLogsInput = {
    where: FirmWhereUniqueInput
    create: XOR<FirmCreateWithoutActivityLogsInput, FirmUncheckedCreateWithoutActivityLogsInput>
  }

  export type FirmUpsertWithoutActivityLogsInput = {
    update: XOR<FirmUpdateWithoutActivityLogsInput, FirmUncheckedUpdateWithoutActivityLogsInput>
    create: XOR<FirmCreateWithoutActivityLogsInput, FirmUncheckedCreateWithoutActivityLogsInput>
    where?: FirmWhereInput
  }

  export type FirmUpdateToOneWithWhereWithoutActivityLogsInput = {
    where?: FirmWhereInput
    data: XOR<FirmUpdateWithoutActivityLogsInput, FirmUncheckedUpdateWithoutActivityLogsInput>
  }

  export type FirmUpdateWithoutActivityLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleReviewsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accentColor?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundColor?: NullableStringFieldUpdateOperationsInput | string | null
    fontColor?: NullableStringFieldUpdateOperationsInput | string | null
    showAgencyBranding?: BoolFieldUpdateOperationsInput | boolean
    logoScale?: FloatFieldUpdateOperationsInput | number
    borderRadius?: StringFieldUpdateOperationsInput | string
    bioFontFamily?: StringFieldUpdateOperationsInput | string
    bioFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontFamily?: StringFieldUpdateOperationsInput | string
    firmNameFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontWeight?: StringFieldUpdateOperationsInput | string
    isColorLinked?: BoolFieldUpdateOperationsInput | boolean
    isFontLinked?: BoolFieldUpdateOperationsInput | boolean
    bioFontColor?: StringFieldUpdateOperationsInput | string
    firmNameFontColor?: StringFieldUpdateOperationsInput | string
    memberCardBgColor?: StringFieldUpdateOperationsInput | string
    memberPhotoSpacing?: IntFieldUpdateOperationsInput | number
    showMemberNarrative?: BoolFieldUpdateOperationsInput | boolean
    isMemberCardColorLinked?: BoolFieldUpdateOperationsInput | boolean
    cardShadowIntensity?: FloatFieldUpdateOperationsInput | number
    portfolioListStyle?: StringFieldUpdateOperationsInput | string
    showSearchBar?: BoolFieldUpdateOperationsInput | boolean
    teamListStyle?: StringFieldUpdateOperationsInput | string
    viewLayoutMode?: StringFieldUpdateOperationsInput | string
    tombstoneInfoBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneLayout?: FirmUpdatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: IntFieldUpdateOperationsInput | number
    tombstoneMediaBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneMetricsBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneNarrativeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstonePadding?: IntFieldUpdateOperationsInput | number
    deals?: DealUpdateManyWithoutFirmNestedInput
    invitations?: InvitationUpdateManyWithoutFirmNestedInput
    teamMembers?: TeamMemberUpdateManyWithoutFirmNestedInput
    users?: UserUpdateManyWithoutFirmNestedInput
    tasks?: TaskUpdateManyWithoutFirmNestedInput
  }

  export type FirmUncheckedUpdateWithoutActivityLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleReviewsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accentColor?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundColor?: NullableStringFieldUpdateOperationsInput | string | null
    fontColor?: NullableStringFieldUpdateOperationsInput | string | null
    showAgencyBranding?: BoolFieldUpdateOperationsInput | boolean
    logoScale?: FloatFieldUpdateOperationsInput | number
    borderRadius?: StringFieldUpdateOperationsInput | string
    bioFontFamily?: StringFieldUpdateOperationsInput | string
    bioFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontFamily?: StringFieldUpdateOperationsInput | string
    firmNameFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontWeight?: StringFieldUpdateOperationsInput | string
    isColorLinked?: BoolFieldUpdateOperationsInput | boolean
    isFontLinked?: BoolFieldUpdateOperationsInput | boolean
    bioFontColor?: StringFieldUpdateOperationsInput | string
    firmNameFontColor?: StringFieldUpdateOperationsInput | string
    memberCardBgColor?: StringFieldUpdateOperationsInput | string
    memberPhotoSpacing?: IntFieldUpdateOperationsInput | number
    showMemberNarrative?: BoolFieldUpdateOperationsInput | boolean
    isMemberCardColorLinked?: BoolFieldUpdateOperationsInput | boolean
    cardShadowIntensity?: FloatFieldUpdateOperationsInput | number
    portfolioListStyle?: StringFieldUpdateOperationsInput | string
    showSearchBar?: BoolFieldUpdateOperationsInput | boolean
    teamListStyle?: StringFieldUpdateOperationsInput | string
    viewLayoutMode?: StringFieldUpdateOperationsInput | string
    tombstoneInfoBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneLayout?: FirmUpdatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: IntFieldUpdateOperationsInput | number
    tombstoneMediaBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneMetricsBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneNarrativeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstonePadding?: IntFieldUpdateOperationsInput | number
    deals?: DealUncheckedUpdateManyWithoutFirmNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutFirmNestedInput
    teamMembers?: TeamMemberUncheckedUpdateManyWithoutFirmNestedInput
    users?: UserUncheckedUpdateManyWithoutFirmNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutFirmNestedInput
  }

  export type FirmCreateWithoutTasksInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    primaryColor?: string | null
    physicalAddress?: string | null
    linkedInUrl?: string | null
    googleReviewsUrl?: string | null
    bio?: string | null
    heroMediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accentColor?: string | null
    backgroundColor?: string | null
    fontColor?: string | null
    showAgencyBranding?: boolean
    logoScale?: number
    borderRadius?: string
    bioFontFamily?: string
    bioFontSize?: number
    firmNameFontFamily?: string
    firmNameFontSize?: number
    firmNameFontWeight?: string
    isColorLinked?: boolean
    isFontLinked?: boolean
    bioFontColor?: string
    firmNameFontColor?: string
    memberCardBgColor?: string
    memberPhotoSpacing?: number
    showMemberNarrative?: boolean
    isMemberCardColorLinked?: boolean
    cardShadowIntensity?: number
    portfolioListStyle?: string
    showSearchBar?: boolean
    teamListStyle?: string
    viewLayoutMode?: string
    tombstoneInfoBgColor?: string | null
    tombstoneLayout?: FirmCreatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: number
    tombstoneMediaBgColor?: string | null
    tombstoneMetricsBgColor?: string | null
    tombstoneNarrativeBgColor?: string | null
    tombstonePadding?: number
    activityLogs?: ActivityLogCreateNestedManyWithoutFirmInput
    deals?: DealCreateNestedManyWithoutFirmInput
    invitations?: InvitationCreateNestedManyWithoutFirmInput
    teamMembers?: TeamMemberCreateNestedManyWithoutFirmInput
    users?: UserCreateNestedManyWithoutFirmInput
  }

  export type FirmUncheckedCreateWithoutTasksInput = {
    id?: string
    name: string
    slug: string
    logoUrl?: string | null
    primaryColor?: string | null
    physicalAddress?: string | null
    linkedInUrl?: string | null
    googleReviewsUrl?: string | null
    bio?: string | null
    heroMediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accentColor?: string | null
    backgroundColor?: string | null
    fontColor?: string | null
    showAgencyBranding?: boolean
    logoScale?: number
    borderRadius?: string
    bioFontFamily?: string
    bioFontSize?: number
    firmNameFontFamily?: string
    firmNameFontSize?: number
    firmNameFontWeight?: string
    isColorLinked?: boolean
    isFontLinked?: boolean
    bioFontColor?: string
    firmNameFontColor?: string
    memberCardBgColor?: string
    memberPhotoSpacing?: number
    showMemberNarrative?: boolean
    isMemberCardColorLinked?: boolean
    cardShadowIntensity?: number
    portfolioListStyle?: string
    showSearchBar?: boolean
    teamListStyle?: string
    viewLayoutMode?: string
    tombstoneInfoBgColor?: string | null
    tombstoneLayout?: FirmCreatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: number
    tombstoneMediaBgColor?: string | null
    tombstoneMetricsBgColor?: string | null
    tombstoneNarrativeBgColor?: string | null
    tombstonePadding?: number
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutFirmInput
    deals?: DealUncheckedCreateNestedManyWithoutFirmInput
    invitations?: InvitationUncheckedCreateNestedManyWithoutFirmInput
    teamMembers?: TeamMemberUncheckedCreateNestedManyWithoutFirmInput
    users?: UserUncheckedCreateNestedManyWithoutFirmInput
  }

  export type FirmCreateOrConnectWithoutTasksInput = {
    where: FirmWhereUniqueInput
    create: XOR<FirmCreateWithoutTasksInput, FirmUncheckedCreateWithoutTasksInput>
  }

  export type TeamMemberCreateWithoutTasksInput = {
    id?: string
    name: string
    slug: string
    role: string
    email?: string | null
    imageURL?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bio?: string | null
    firmIds?: TeamMemberCreatefirmIdsInput | string[]
    heroMediaUrl?: string | null
    linkedInUrl?: string | null
    phoneNumber?: string | null
    sortOrder?: number
    department?: string | null
    manager?: TeamMemberCreateNestedOneWithoutReportsInput
    reports?: TeamMemberCreateNestedManyWithoutManagerInput
    deals?: DealCreateNestedManyWithoutTeamMemberInput
    firm: FirmCreateNestedOneWithoutTeamMembersInput
    user?: UserCreateNestedOneWithoutProfessionalProfileInput
    files?: AssetFileCreateNestedManyWithoutTeamMemberInput
  }

  export type TeamMemberUncheckedCreateWithoutTasksInput = {
    id?: string
    name: string
    slug: string
    role: string
    email?: string | null
    imageURL?: string | null
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    bio?: string | null
    firmIds?: TeamMemberCreatefirmIdsInput | string[]
    heroMediaUrl?: string | null
    linkedInUrl?: string | null
    phoneNumber?: string | null
    sortOrder?: number
    userId?: string | null
    department?: string | null
    managerId?: string | null
    reports?: TeamMemberUncheckedCreateNestedManyWithoutManagerInput
    deals?: DealUncheckedCreateNestedManyWithoutTeamMemberInput
    files?: AssetFileUncheckedCreateNestedManyWithoutTeamMemberInput
  }

  export type TeamMemberCreateOrConnectWithoutTasksInput = {
    where: TeamMemberWhereUniqueInput
    create: XOR<TeamMemberCreateWithoutTasksInput, TeamMemberUncheckedCreateWithoutTasksInput>
  }

  export type FirmUpsertWithoutTasksInput = {
    update: XOR<FirmUpdateWithoutTasksInput, FirmUncheckedUpdateWithoutTasksInput>
    create: XOR<FirmCreateWithoutTasksInput, FirmUncheckedCreateWithoutTasksInput>
    where?: FirmWhereInput
  }

  export type FirmUpdateToOneWithWhereWithoutTasksInput = {
    where?: FirmWhereInput
    data: XOR<FirmUpdateWithoutTasksInput, FirmUncheckedUpdateWithoutTasksInput>
  }

  export type FirmUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleReviewsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accentColor?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundColor?: NullableStringFieldUpdateOperationsInput | string | null
    fontColor?: NullableStringFieldUpdateOperationsInput | string | null
    showAgencyBranding?: BoolFieldUpdateOperationsInput | boolean
    logoScale?: FloatFieldUpdateOperationsInput | number
    borderRadius?: StringFieldUpdateOperationsInput | string
    bioFontFamily?: StringFieldUpdateOperationsInput | string
    bioFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontFamily?: StringFieldUpdateOperationsInput | string
    firmNameFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontWeight?: StringFieldUpdateOperationsInput | string
    isColorLinked?: BoolFieldUpdateOperationsInput | boolean
    isFontLinked?: BoolFieldUpdateOperationsInput | boolean
    bioFontColor?: StringFieldUpdateOperationsInput | string
    firmNameFontColor?: StringFieldUpdateOperationsInput | string
    memberCardBgColor?: StringFieldUpdateOperationsInput | string
    memberPhotoSpacing?: IntFieldUpdateOperationsInput | number
    showMemberNarrative?: BoolFieldUpdateOperationsInput | boolean
    isMemberCardColorLinked?: BoolFieldUpdateOperationsInput | boolean
    cardShadowIntensity?: FloatFieldUpdateOperationsInput | number
    portfolioListStyle?: StringFieldUpdateOperationsInput | string
    showSearchBar?: BoolFieldUpdateOperationsInput | boolean
    teamListStyle?: StringFieldUpdateOperationsInput | string
    viewLayoutMode?: StringFieldUpdateOperationsInput | string
    tombstoneInfoBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneLayout?: FirmUpdatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: IntFieldUpdateOperationsInput | number
    tombstoneMediaBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneMetricsBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneNarrativeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstonePadding?: IntFieldUpdateOperationsInput | number
    activityLogs?: ActivityLogUpdateManyWithoutFirmNestedInput
    deals?: DealUpdateManyWithoutFirmNestedInput
    invitations?: InvitationUpdateManyWithoutFirmNestedInput
    teamMembers?: TeamMemberUpdateManyWithoutFirmNestedInput
    users?: UserUpdateManyWithoutFirmNestedInput
  }

  export type FirmUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    physicalAddress?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleReviewsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accentColor?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundColor?: NullableStringFieldUpdateOperationsInput | string | null
    fontColor?: NullableStringFieldUpdateOperationsInput | string | null
    showAgencyBranding?: BoolFieldUpdateOperationsInput | boolean
    logoScale?: FloatFieldUpdateOperationsInput | number
    borderRadius?: StringFieldUpdateOperationsInput | string
    bioFontFamily?: StringFieldUpdateOperationsInput | string
    bioFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontFamily?: StringFieldUpdateOperationsInput | string
    firmNameFontSize?: IntFieldUpdateOperationsInput | number
    firmNameFontWeight?: StringFieldUpdateOperationsInput | string
    isColorLinked?: BoolFieldUpdateOperationsInput | boolean
    isFontLinked?: BoolFieldUpdateOperationsInput | boolean
    bioFontColor?: StringFieldUpdateOperationsInput | string
    firmNameFontColor?: StringFieldUpdateOperationsInput | string
    memberCardBgColor?: StringFieldUpdateOperationsInput | string
    memberPhotoSpacing?: IntFieldUpdateOperationsInput | number
    showMemberNarrative?: BoolFieldUpdateOperationsInput | boolean
    isMemberCardColorLinked?: BoolFieldUpdateOperationsInput | boolean
    cardShadowIntensity?: FloatFieldUpdateOperationsInput | number
    portfolioListStyle?: StringFieldUpdateOperationsInput | string
    showSearchBar?: BoolFieldUpdateOperationsInput | boolean
    teamListStyle?: StringFieldUpdateOperationsInput | string
    viewLayoutMode?: StringFieldUpdateOperationsInput | string
    tombstoneInfoBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneLayout?: FirmUpdatetombstoneLayoutInput | string[]
    tombstoneMaxWidth?: IntFieldUpdateOperationsInput | number
    tombstoneMediaBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneMetricsBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstoneNarrativeBgColor?: NullableStringFieldUpdateOperationsInput | string | null
    tombstonePadding?: IntFieldUpdateOperationsInput | number
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutFirmNestedInput
    deals?: DealUncheckedUpdateManyWithoutFirmNestedInput
    invitations?: InvitationUncheckedUpdateManyWithoutFirmNestedInput
    teamMembers?: TeamMemberUncheckedUpdateManyWithoutFirmNestedInput
    users?: UserUncheckedUpdateManyWithoutFirmNestedInput
  }

  export type TeamMemberUpsertWithoutTasksInput = {
    update: XOR<TeamMemberUpdateWithoutTasksInput, TeamMemberUncheckedUpdateWithoutTasksInput>
    create: XOR<TeamMemberCreateWithoutTasksInput, TeamMemberUncheckedCreateWithoutTasksInput>
    where?: TeamMemberWhereInput
  }

  export type TeamMemberUpdateToOneWithWhereWithoutTasksInput = {
    where?: TeamMemberWhereInput
    data: XOR<TeamMemberUpdateWithoutTasksInput, TeamMemberUncheckedUpdateWithoutTasksInput>
  }

  export type TeamMemberUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    department?: NullableStringFieldUpdateOperationsInput | string | null
    manager?: TeamMemberUpdateOneWithoutReportsNestedInput
    reports?: TeamMemberUpdateManyWithoutManagerNestedInput
    deals?: DealUpdateManyWithoutTeamMemberNestedInput
    firm?: FirmUpdateOneRequiredWithoutTeamMembersNestedInput
    user?: UserUpdateOneWithoutProfessionalProfileNestedInput
    files?: AssetFileUpdateManyWithoutTeamMemberNestedInput
  }

  export type TeamMemberUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    reports?: TeamMemberUncheckedUpdateManyWithoutManagerNestedInput
    deals?: DealUncheckedUpdateManyWithoutTeamMemberNestedInput
    files?: AssetFileUncheckedUpdateManyWithoutTeamMemberNestedInput
  }

  export type ActivityLogCreateManyFirmInput = {
    id?: string
    type: string
    title: string
    timestamp?: Date | string
    dealId?: string | null
    userId?: string | null
    memberId?: string | null
    performedByEmail?: string | null
  }

  export type DealCreateManyFirmInput = {
    id?: string
    address: string
    assetType: $Enums.AssetType
    strategy: $Enums.Strategy
    purchaseAmount?: number | null
    financedAmount?: number | null
    stillImageURL?: string | null
    generatedVideoURL?: string | null
    isPublic?: boolean
    capRate?: number | null
    sqFt?: number | null
    teamMemberId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    arv?: number | null
    context?: string | null
    financingType?: string | null
    images?: DealCreateimagesInput | string[]
    investmentOverview?: string | null
    rehabAmount?: number | null
    teamMemberIds?: DealCreateteamMemberIdsInput | string[]
    sortOrder?: number
  }

  export type InvitationCreateManyFirmInput = {
    id?: string
    email: string
    token: string
    role?: $Enums.UserRole
    isUsed?: boolean
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type TeamMemberCreateManyFirmInput = {
    id?: string
    name: string
    slug: string
    role: string
    email?: string | null
    imageURL?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bio?: string | null
    firmIds?: TeamMemberCreatefirmIdsInput | string[]
    heroMediaUrl?: string | null
    linkedInUrl?: string | null
    phoneNumber?: string | null
    sortOrder?: number
    userId?: string | null
    department?: string | null
    managerId?: string | null
  }

  export type UserCreateManyFirmInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    name?: string | null
    resetToken?: string | null
    resetTokenExpires?: Date | string | null
  }

  export type TaskCreateManyFirmInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    priority?: string
    assigneeId?: string | null
    dueDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityLogUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    dealId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    memberId?: NullableStringFieldUpdateOperationsInput | string | null
    performedByEmail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityLogUncheckedUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    dealId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    memberId?: NullableStringFieldUpdateOperationsInput | string | null
    performedByEmail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityLogUncheckedUpdateManyWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    dealId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    memberId?: NullableStringFieldUpdateOperationsInput | string | null
    performedByEmail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DealUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    assetType?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    strategy?: EnumStrategyFieldUpdateOperationsInput | $Enums.Strategy
    purchaseAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    financedAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    stillImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    generatedVideoURL?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    capRate?: NullableFloatFieldUpdateOperationsInput | number | null
    sqFt?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arv?: NullableFloatFieldUpdateOperationsInput | number | null
    context?: NullableStringFieldUpdateOperationsInput | string | null
    financingType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: DealUpdateimagesInput | string[]
    investmentOverview?: NullableStringFieldUpdateOperationsInput | string | null
    rehabAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    teamMemberIds?: DealUpdateteamMemberIdsInput | string[]
    sortOrder?: IntFieldUpdateOperationsInput | number
    teamMember?: TeamMemberUpdateOneWithoutDealsNestedInput
  }

  export type DealUncheckedUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    assetType?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    strategy?: EnumStrategyFieldUpdateOperationsInput | $Enums.Strategy
    purchaseAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    financedAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    stillImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    generatedVideoURL?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    capRate?: NullableFloatFieldUpdateOperationsInput | number | null
    sqFt?: NullableFloatFieldUpdateOperationsInput | number | null
    teamMemberId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arv?: NullableFloatFieldUpdateOperationsInput | number | null
    context?: NullableStringFieldUpdateOperationsInput | string | null
    financingType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: DealUpdateimagesInput | string[]
    investmentOverview?: NullableStringFieldUpdateOperationsInput | string | null
    rehabAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    teamMemberIds?: DealUpdateteamMemberIdsInput | string[]
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type DealUncheckedUpdateManyWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    assetType?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    strategy?: EnumStrategyFieldUpdateOperationsInput | $Enums.Strategy
    purchaseAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    financedAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    stillImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    generatedVideoURL?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    capRate?: NullableFloatFieldUpdateOperationsInput | number | null
    sqFt?: NullableFloatFieldUpdateOperationsInput | number | null
    teamMemberId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arv?: NullableFloatFieldUpdateOperationsInput | number | null
    context?: NullableStringFieldUpdateOperationsInput | string | null
    financingType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: DealUpdateimagesInput | string[]
    investmentOverview?: NullableStringFieldUpdateOperationsInput | string | null
    rehabAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    teamMemberIds?: DealUpdateteamMemberIdsInput | string[]
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type InvitationUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationUncheckedUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationUncheckedUpdateManyWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    department?: NullableStringFieldUpdateOperationsInput | string | null
    manager?: TeamMemberUpdateOneWithoutReportsNestedInput
    reports?: TeamMemberUpdateManyWithoutManagerNestedInput
    deals?: DealUpdateManyWithoutTeamMemberNestedInput
    tasks?: TaskUpdateManyWithoutAssigneeNestedInput
    user?: UserUpdateOneWithoutProfessionalProfileNestedInput
    files?: AssetFileUpdateManyWithoutTeamMemberNestedInput
  }

  export type TeamMemberUncheckedUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    reports?: TeamMemberUncheckedUpdateManyWithoutManagerNestedInput
    deals?: DealUncheckedUpdateManyWithoutTeamMemberNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutAssigneeNestedInput
    files?: AssetFileUncheckedUpdateManyWithoutTeamMemberNestedInput
  }

  export type TeamMemberUncheckedUpdateManyWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    professionalProfile?: TeamMemberUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    professionalProfile?: TeamMemberUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignee?: TeamMemberUpdateOneWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    assigneeId?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    assigneeId?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberCreateManyManagerInput = {
    id?: string
    name: string
    slug: string
    role: string
    email?: string | null
    imageURL?: string | null
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    bio?: string | null
    firmIds?: TeamMemberCreatefirmIdsInput | string[]
    heroMediaUrl?: string | null
    linkedInUrl?: string | null
    phoneNumber?: string | null
    sortOrder?: number
    userId?: string | null
    department?: string | null
  }

  export type DealCreateManyTeamMemberInput = {
    id?: string
    address: string
    assetType: $Enums.AssetType
    strategy: $Enums.Strategy
    purchaseAmount?: number | null
    financedAmount?: number | null
    stillImageURL?: string | null
    generatedVideoURL?: string | null
    isPublic?: boolean
    capRate?: number | null
    sqFt?: number | null
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    arv?: number | null
    context?: string | null
    financingType?: string | null
    images?: DealCreateimagesInput | string[]
    investmentOverview?: string | null
    rehabAmount?: number | null
    teamMemberIds?: DealCreateteamMemberIdsInput | string[]
    sortOrder?: number
  }

  export type TaskCreateManyAssigneeInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    priority?: string
    dueDate?: Date | string | null
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssetFileCreateManyTeamMemberInput = {
    id?: string
    name: string
    content: string
    type?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamMemberUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    department?: NullableStringFieldUpdateOperationsInput | string | null
    reports?: TeamMemberUpdateManyWithoutManagerNestedInput
    deals?: DealUpdateManyWithoutTeamMemberNestedInput
    tasks?: TaskUpdateManyWithoutAssigneeNestedInput
    firm?: FirmUpdateOneRequiredWithoutTeamMembersNestedInput
    user?: UserUpdateOneWithoutProfessionalProfileNestedInput
    files?: AssetFileUpdateManyWithoutTeamMemberNestedInput
  }

  export type TeamMemberUncheckedUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    reports?: TeamMemberUncheckedUpdateManyWithoutManagerNestedInput
    deals?: DealUncheckedUpdateManyWithoutTeamMemberNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutAssigneeNestedInput
    files?: AssetFileUncheckedUpdateManyWithoutTeamMemberNestedInput
  }

  export type TeamMemberUncheckedUpdateManyWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageURL?: NullableStringFieldUpdateOperationsInput | string | null
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    firmIds?: TeamMemberUpdatefirmIdsInput | string[]
    heroMediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DealUpdateWithoutTeamMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    assetType?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    strategy?: EnumStrategyFieldUpdateOperationsInput | $Enums.Strategy
    purchaseAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    financedAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    stillImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    generatedVideoURL?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    capRate?: NullableFloatFieldUpdateOperationsInput | number | null
    sqFt?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arv?: NullableFloatFieldUpdateOperationsInput | number | null
    context?: NullableStringFieldUpdateOperationsInput | string | null
    financingType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: DealUpdateimagesInput | string[]
    investmentOverview?: NullableStringFieldUpdateOperationsInput | string | null
    rehabAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    teamMemberIds?: DealUpdateteamMemberIdsInput | string[]
    sortOrder?: IntFieldUpdateOperationsInput | number
    firm?: FirmUpdateOneRequiredWithoutDealsNestedInput
  }

  export type DealUncheckedUpdateWithoutTeamMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    assetType?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    strategy?: EnumStrategyFieldUpdateOperationsInput | $Enums.Strategy
    purchaseAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    financedAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    stillImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    generatedVideoURL?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    capRate?: NullableFloatFieldUpdateOperationsInput | number | null
    sqFt?: NullableFloatFieldUpdateOperationsInput | number | null
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arv?: NullableFloatFieldUpdateOperationsInput | number | null
    context?: NullableStringFieldUpdateOperationsInput | string | null
    financingType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: DealUpdateimagesInput | string[]
    investmentOverview?: NullableStringFieldUpdateOperationsInput | string | null
    rehabAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    teamMemberIds?: DealUpdateteamMemberIdsInput | string[]
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type DealUncheckedUpdateManyWithoutTeamMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    assetType?: EnumAssetTypeFieldUpdateOperationsInput | $Enums.AssetType
    strategy?: EnumStrategyFieldUpdateOperationsInput | $Enums.Strategy
    purchaseAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    financedAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    stillImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    generatedVideoURL?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    capRate?: NullableFloatFieldUpdateOperationsInput | number | null
    sqFt?: NullableFloatFieldUpdateOperationsInput | number | null
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arv?: NullableFloatFieldUpdateOperationsInput | number | null
    context?: NullableStringFieldUpdateOperationsInput | string | null
    financingType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: DealUpdateimagesInput | string[]
    investmentOverview?: NullableStringFieldUpdateOperationsInput | string | null
    rehabAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    teamMemberIds?: DealUpdateteamMemberIdsInput | string[]
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type TaskUpdateWithoutAssigneeInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firm?: FirmUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutAssigneeInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyWithoutAssigneeInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetFileUpdateWithoutTeamMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetFileUncheckedUpdateWithoutTeamMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetFileUncheckedUpdateManyWithoutTeamMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}