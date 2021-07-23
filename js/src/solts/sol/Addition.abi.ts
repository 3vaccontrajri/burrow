//Code generated by solts. DO NOT EDIT.
import { Address, CancelStreamSignal, ContractCodec, Event, Keccak, linker } from '../../index';
interface Provider {
  deploy(
    data: string | Uint8Array,
    contractMeta?: {
      abi: string;
      codeHash: Uint8Array;
    }[],
  ): Promise<Address>;
  call(data: string | Uint8Array, address: string): Promise<Uint8Array | undefined>;
  callSim(data: string | Uint8Array, address: string): Promise<Uint8Array | undefined>;
  listen(
    signatures: string[],
    address: string,
    callback: (err?: Error, event?: Event) => CancelStreamSignal | void,
    start?: 'first' | 'latest' | 'stream' | number,
    end?: 'first' | 'latest' | 'stream' | number,
  ): unknown;
  contractCodec(contractABI: string): ContractCodec;
}
export type Caller = typeof defaultCall;
export async function defaultCall<Output>(
  client: Provider,
  addr: string,
  data: Uint8Array,
  isSim: boolean,
  callback: (returnData: Uint8Array | undefined) => Output,
): Promise<Output> {
  const returnData = await (isSim ? client.callSim(data, addr) : client.call(data, addr));
  return callback(returnData);
}
export namespace Addition {
  export const contractName = 'Addition';
  export const abi =
    '[{"constant":true,"inputs":[{"internalType":"int256","name":"a","type":"int256"},{"internalType":"int256","name":"b","type":"int256"}],"name":"add","outputs":[{"internalType":"int256","name":"sum","type":"int256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"internalType":"int256","name":"a","type":"int256"},{"internalType":"int256","name":"b","type":"int256"}],"name":"sub","outputs":[{"internalType":"int256","name":"","type":"int256"}],"payable":false,"stateMutability":"pure","type":"function"}]';
  export const bytecode =
    '608060405234801561001057600080fd5b506101b2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063a5f3c23b1461003b578063adefc37b14610087575b600080fd5b6100716004803603604081101561005157600080fd5b8101908080359060200190929190803590602001909291905050506100d3565b6040518082815260200191505060405180910390f35b6100bd6004803603604081101561009d57600080fd5b8101908080359060200190929190803590602001909291905050506100e0565b6040518082815260200191505060405180910390f35b6000818301905092915050565b60006101758373__$c58c94ed6aafc60c33b5e1db056449bb85$__6325b832d9856040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b15801561013557600080fd5b505af4158015610149573d6000803e3d6000fd5b505050506040513d602081101561015f57600080fd5b81019080805190602001909291905050506100d3565b90509291505056fea265627a7a723158200e39adfefd6f39f3fc67f179a9482aaffb5acf36277d704070d5a0e5f22916c064736f6c63430005110032';
  export const deployedBytecode =
    '608060405234801561001057600080fd5b50600436106100365760003560e01c8063a5f3c23b1461003b578063adefc37b14610087575b600080fd5b6100716004803603604081101561005157600080fd5b8101908080359060200190929190803590602001909291905050506100d3565b6040518082815260200191505060405180910390f35b6100bd6004803603604081101561009d57600080fd5b8101908080359060200190929190803590602001909291905050506100e0565b6040518082815260200191505060405180910390f35b6000818301905092915050565b60006101758373__$c58c94ed6aafc60c33b5e1db056449bb85$__6325b832d9856040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b15801561013557600080fd5b505af4158015610149573d6000803e3d6000fd5b505050506040513d602081101561015f57600080fd5b81019080805190602001909291905050506100d3565b90509291505056fea265627a7a723158200e39adfefd6f39f3fc67f179a9482aaffb5acf36277d704070d5a0e5f22916c064736f6c63430005110032';
  export function deploy({
    client,
    withContractMeta,
    libraries: { NegationLib },
  }: {
    client: Provider;
    withContractMeta?: boolean;
    libraries: {
      NegationLib: string;
    };
  }): Promise<string> {
    const codec = client.contractCodec(abi);
    const links = [{ name: '$c58c94ed6aafc60c33b5e1db056449bb85$', address: NegationLib }];
    const linkedBytecode = linker(bytecode, links);
    const data = Buffer.concat([Buffer.from(linkedBytecode, 'hex'), codec.encodeDeploy()]);
    return client.deploy(
      data,
      withContractMeta
        ? [
            {
              abi: Addition.abi,
              codeHash: new Keccak(256).update(linker(Addition.deployedBytecode, links), 'hex').digest('binary'),
            },
          ]
        : undefined,
    );
  }
  export async function deployContract(deps: {
    client: Provider;
    withContractMeta?: boolean;
    libraries: {
      NegationLib: string;
    };
  }): Promise<Contract> {
    const address = await deploy(deps);
    return contract(deps.client, address);
  }
  export type Contract = ReturnType<typeof contract>;
  export const contract = (client: Provider, address: string) =>
    ({
      name: 'Addition',
      address,
      functions: {
        add(
          a: number,
          b: number,
          call = defaultCall,
        ): Promise<{
          sum: number;
        }> {
          const data = encode(client).add(a, b);
          return call<{
            sum: number;
          }>(client, address, data, true, (data: Uint8Array | undefined) => {
            return decode(client, data).add();
          });
        },
        sub(a: number, b: number, call = defaultCall): Promise<[number]> {
          const data = encode(client).sub(a, b);
          return call<[number]>(client, address, data, true, (data: Uint8Array | undefined) => {
            return decode(client, data).sub();
          });
        },
      } as const,
    } as const);
  export const encode = (client: Provider) => {
    const codec = client.contractCodec(abi);
    return {
      add: (a: number, b: number) => {
        return codec.encodeFunctionData('A5F3C23B', a, b);
      },
      sub: (a: number, b: number) => {
        return codec.encodeFunctionData('ADEFC37B', a, b);
      },
    };
  };
  export const decode = (client: Provider, data: Uint8Array | undefined, topics: Uint8Array[] = []) => {
    const codec = client.contractCodec(abi);
    return {
      add: (): {
        sum: number;
      } => {
        const [sum] = codec.decodeFunctionResult('A5F3C23B', data);
        return { sum: sum };
      },
      sub: (): [number] => {
        return codec.decodeFunctionResult('ADEFC37B', data);
      },
    };
  };
}
